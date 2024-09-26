/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AboutPage() {
    return (
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-10">
        <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="p-4">
              Dylan is a photographer based in Northern Ireland, his work consists of mainly landscapes/ cityscapes and some street style photography.
            </p>
            <p className="p-4">
            He started His photography journey in 2023 and has since branched out into several genres of photography
            </p>
            <p className="p-4">
            Please use the form on the contact me page if interested in obtaining prints or you want to reach out
            </p>
            <p className="p-4">
            Thank you!
            </p>
          </CardContent>
        </Card>
      </div>
    );
}
