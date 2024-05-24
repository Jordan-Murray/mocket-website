import React from 'react';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const EndpointList = ({ endpoints } : {endpoints: any}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>URL Path</TableHeader>
          <TableHeader>Method</TableHeader>
          <TableHeader>Response Status</TableHeader>
          <TableHeader>Response Headers</TableHeader>
          <TableHeader>Response Body</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {endpoints.map((endpoint: any) => (
          <TableRow key={endpoint.id}>
            <TableCell>{endpoint.urlPath}</TableCell>
            <TableCell>{endpoint.method}</TableCell>
            <TableCell>
              <Badge>{endpoint.responseStatus}</Badge>
            </TableCell>
            <TableCell>{JSON.stringify(endpoint.responseHeaders)}</TableCell>
            <TableCell>{endpoint.responseBody}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EndpointList;
