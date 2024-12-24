import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

const EmailInterface = ({ data }) => {
  if (!data) {
    return <p>Loading data details...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          {/* Email Header */}
          <div className="flex items-start space-x-4 mb-6">
            <Avatar className="h-9 w-9">
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback>
                {data.name ? data.name.substring(0, 2).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{data.name}</h2>
                  <p className="text-sm text-gray-500">
                    {data.subject || "No subject"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Reply-To: {data.email}
                  </p>
                </div>
                <span className="text-sm text-gray-500">{data.data_date}</span>
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="space-y-4 mb-8">
            <p>{data.message || "No message provided."}</p>
          </div>

          {/* Reply Section */}
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                placeholder={`Reply to ${data.name}...`}
                className="min-h-[100px] p-4"
              />
              <div className="flex justify-between items-center mt-4">
                <Button variant="ghost" className="text-gray-500">
                  Mute this thread
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInterface;
