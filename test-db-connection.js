import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xthxutsliqptoodkzrcp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0aHh1dHNsaXFwdG9vZGt6cmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTY5MTQsImV4cCI6MjA2NDQzMjkxNH0.K4XzmJauoydPB5jAECh4041MmZIvQLA3WaeACy8Y8mI';

console.log('Testing database connection...');
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n1. Testing basic connection...');
    const { data, error } = await supabase.from('hirebuddy_job_board').select('job_id').limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      console.error('Error details:', error);
      
      // Check if table exists
      console.log('\n2. Checking if table exists...');
      const { data: tables, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'hirebuddy_job_board');
        
      if (tableError) {
        console.error('❌ Cannot check table existence:', tableError.message);
        console.log('🔧 Table might not exist. Please create it manually.');
      } else if (!tables || tables.length === 0) {
        console.log('❌ Table "hirebuddy_job_board" does not exist');
        console.log('🔧 Please create the table using the SQL schema provided.');
      } else {
        console.log('✅ Table exists but query failed');
      }
    } else {
      console.log('✅ Database connection successful');
      console.log('📊 Current jobs count:', data?.length || 0);
      
      // Get table structure
      console.log('\n3. Checking table structure...');
      const { data: columns } = await supabase
        .from('information_schema.columns')
        .select('column_name, data_type, is_nullable')
        .eq('table_schema', 'public')
        .eq('table_name', 'hirebuddy_job_board')
        .order('ordinal_position');
        
      if (columns) {
        console.log('📋 Table columns:');
        columns.forEach(col => {
          console.log(`  - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });
      }
      
      // Test inserting a sample job
      console.log('\n4. Testing job insertion...');
      const sampleJob = {
        job_title: 'Test Developer Position',
        company_name: 'Test Company',
        job_description: 'This is a test job posting to verify database connectivity.',
        experience_required: 'Mid Level (2-4 years)',
        apply_link: 'https://example.com/apply',
        job_location: 'San Francisco, CA',
        city: 'San Francisco',
        state: 'CA',
        remote_flag: true,
        probably_remote: true
      };
      
      const { data: insertedJob, error: insertError } = await supabase
        .from('hirebuddy_job_board')
        .insert(sampleJob)
        .select()
        .single();
        
      if (insertError) {
        console.error('❌ Failed to insert test job:', insertError.message);
      } else {
        console.log('✅ Test job inserted successfully:', insertedJob.job_id);
        
        // Clean up - delete the test job
        const { error: deleteError } = await supabase
          .from('hirebuddy_job_board')
          .delete()
          .eq('job_id', insertedJob.job_id);
          
        if (!deleteError) {
          console.log('🧹 Test job cleaned up');
        }
      }
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the test
testConnection().then(() => {
  console.log('\nTest completed');
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
}); 