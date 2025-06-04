
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface ApplicationFiltersProps {
  filters: {
    status: string;
    company: string;
    position: string;
    dateRange: string;
  };
  setFilters: (filters: any) => void;
}

export const ApplicationFilters = ({ filters, setFilters }: ApplicationFiltersProps) => {
  const clearFilters = () => {
    setFilters({
      status: "",
      company: "",
      position: "",
      dateRange: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            placeholder="Search companies..."
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            placeholder="Search positions..."
            value={filters.position}
            onChange={(e) => setFilters({ ...filters, position: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Select
            value={filters.dateRange}
            onValueChange={(value) => setFilters({ ...filters, dateRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};
