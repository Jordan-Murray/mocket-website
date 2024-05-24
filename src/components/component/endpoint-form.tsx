import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

const EndpointForm = ({ token, fetchEndpoints } : {token: any, fetchEndpoints: any}) => {
  const [urlPath, setUrlPath] = useState('');
  const [method, setMethod] = useState('GET');
  const [responseStatus, setResponseStatus] = useState(200);
  const [responseHeaders, setResponseHeaders] = useState('');
  const [responseBody, setResponseBody] = useState('');

  const handleSubmit = async () => {
    const headers = responseHeaders ? JSON.parse(responseHeaders) : {};

    const newEndpoint = {
      urlPath,
      method,
      responseStatus,
      responseHeaders: headers,
      responseBody,
    };

    try {
      await axios.post('https://api-mocket.azurewebsites.net/api/Endpoints', newEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Refresh or update your endpoints list
      fetchEndpoints();
    } catch (error) {
      console.error('Error creating endpoint:', error);
    }
  };

  fetchEndpoints();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          Create New Endpoint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Mocked Endpoint</DialogTitle>
          <DialogDescription>
            Fill out the details for your new mocked API endpoint.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="url-path">
              URL Path
            </Label>
            <Input
              className="col-span-3"
              id="url-path"
              value={urlPath}
              onChange={(e) => setUrlPath(e.target.value)}
              placeholder="/api/users"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="method">
              Method
            </Label>
            <div className="col-span-3 flex gap-2">
              {['GET', 'POST', 'PUT', 'DELETE'].map((m) => (
                <Button
                  key={m}
                  className={`${
                    method === m ? 'bg-blue-500' : 'bg-gray-500'
                  } hover:bg-blue-600 text-white`}
                  variant="outline"
                  onClick={() => setMethod(m)}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="status-code">
              Response Status
            </Label>
            <Select
              value={responseStatus.toString()}
              onValueChange={(value) => setResponseStatus(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status code" />
              </SelectTrigger>
              <SelectContent>
                {[200, 400, 404, 500].map((status) => (
                  <SelectItem key={status} value={status.toString()}>
                    {status} {statusText(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right" htmlFor="response-headers">
              Response Headers
            </Label>
            <Textarea
              className="col-span-3 h-20"
              id="response-headers"
              value={responseHeaders}
              onChange={(e) => setResponseHeaders(e.target.value)}
              placeholder='{"Content-Type": "application/json"}'
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right" htmlFor="response-body">
              Response Body
            </Label>
            <Textarea
              className="col-span-3 h-20"
              id="response-body"
              value={responseBody}
              onChange={(e) => setResponseBody(e.target.value)}
              placeholder='{"id": 1, "name": "John Doe"}'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Create Endpoint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const statusText = (status: any) => {
  switch (status) {
    case 200: return 'OK';
    case 400: return 'Bad Request';
    case 404: return 'Not Found';
    case 500: return 'Internal Server Error';
    default: return '';
  }
};

export default EndpointForm;
