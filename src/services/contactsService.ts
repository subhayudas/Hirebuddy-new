import { supabase } from '@/lib/supabase';

export interface Contact {
  id: string;
  created_at: string;
  full_name: string | null;
  company_name: string | null;
  linkedin_link: string | null;
  email: string | null;
  title: string | null;
  first_name: string | null;
  company_website_full: string | null;
  email_sent_on: string | null;
}

export interface ContactForDisplay {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  linkedin_link?: string;
  company_website?: string;
  email_sent_on?: string;
}

class ContactsService {
  // Get all contacts from the testdb table
  async getContacts(): Promise<ContactForDisplay[]> {
    try {
      const { data, error } = await supabase
        .from('testdb')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts:', error);
        throw new Error(`Failed to fetch contacts: ${error.message}`);
      }

      // Transform the data to match the expected interface
      const transformedContacts: ContactForDisplay[] = (data || []).map((contact: Contact) => ({
        id: contact.id,
        name: contact.full_name || contact.first_name || 'Unknown',
        email: contact.email || '',
        company: contact.company_name || undefined,
        title: contact.title || undefined,
        linkedin_link: contact.linkedin_link || undefined,
        company_website: contact.company_website_full || undefined,
        email_sent_on: contact.email_sent_on || undefined,
      }));

      return transformedContacts;
    } catch (error) {
      console.error('Error in getContacts:', error);
      throw error;
    }
  }

  // Add a new contact to the testdb table
  async addContact(contactData: {
    full_name?: string;
    first_name?: string;
    company_name?: string;
    linkedin_link?: string;
    email?: string;
    title?: string;
    company_website_full?: string;
  }): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('testdb')
        .insert([contactData])
        .select()
        .single();

      if (error) {
        console.error('Error adding contact:', error);
        throw new Error(`Failed to add contact: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in addContact:', error);
      throw error;
    }
  }

  // Update a contact in the testdb table
  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('testdb')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating contact:', error);
        throw new Error(`Failed to update contact: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error in updateContact:', error);
      throw error;
    }
  }

  // Mark email as sent for a contact
  async markEmailSent(contactId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('testdb')
        .update({ email_sent_on: new Date().toISOString() })
        .eq('id', contactId);

      if (error) {
        console.error('Error marking email as sent:', error);
        throw new Error(`Failed to mark email as sent: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in markEmailSent:', error);
      throw error;
    }
  }

  // Delete a contact from the testdb table
  async deleteContact(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('testdb')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact:', error);
        throw new Error(`Failed to delete contact: ${error.message}`);
      }
    } catch (error) {
      console.error('Error in deleteContact:', error);
      throw error;
    }
  }

  // Search contacts by name, email, or company
  async searchContacts(searchTerm: string): Promise<ContactForDisplay[]> {
    try {
      const { data, error } = await supabase
        .from('testdb')
        .select('*')
        .or(`full_name.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,company_name.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching contacts:', error);
        throw new Error(`Failed to search contacts: ${error.message}`);
      }

      // Transform the data to match the expected interface
      const transformedContacts: ContactForDisplay[] = (data || []).map((contact: Contact) => ({
        id: contact.id,
        name: contact.full_name || contact.first_name || 'Unknown',
        email: contact.email || '',
        company: contact.company_name || undefined,
        title: contact.title || undefined,
        linkedin_link: contact.linkedin_link || undefined,
        company_website: contact.company_website_full || undefined,
        email_sent_on: contact.email_sent_on || undefined,
      }));

      return transformedContacts;
    } catch (error) {
      console.error('Error in searchContacts:', error);
      throw error;
    }
  }

  // Get contacts with email addresses only
  async getContactsWithEmail(): Promise<ContactForDisplay[]> {
    try {
      const { data, error } = await supabase
        .from('testdb')
        .select('*')
        .not('email', 'is', null)
        .neq('email', '')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contacts with email:', error);
        throw new Error(`Failed to fetch contacts with email: ${error.message}`);
      }

      // Transform the data to match the expected interface
      const transformedContacts: ContactForDisplay[] = (data || []).map((contact: Contact) => ({
        id: contact.id,
        name: contact.full_name || contact.first_name || 'Unknown',
        email: contact.email || '',
        company: contact.company_name || undefined,
        title: contact.title || undefined,
        linkedin_link: contact.linkedin_link || undefined,
        company_website: contact.company_website_full || undefined,
        email_sent_on: contact.email_sent_on || undefined,
      }));

      return transformedContacts;
    } catch (error) {
      console.error('Error in getContactsWithEmail:', error);
      throw error;
    }
  }
}

export const contactsService = new ContactsService(); 