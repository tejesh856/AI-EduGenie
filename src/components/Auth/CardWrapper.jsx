"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Backbutton from "./Backbutton";
import Authheader from "./Authheader";

export default function CardWrapper({
  label,
  title,
  backbuttonhref,
  backbuttonlabel,
  ChildComponent,
  verifylabel,
}) {
  return (
    <Card
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: 0.2, type: "tween" }}
      className=" max-xl:w-1/3 xl:w-1/3 max-lg:w-1/2 max-md:w-3/4 max-sm:w-4/5 shadow-md flex flex-col items-center dark:bg-neutral-900 bg-[#f7f7f7]"
    >
      <CardHeader>
        <Authheader label={label} title={title} />
      </CardHeader>
      <CardContent className="px-6 pb-4 w-full">
        {ChildComponent && <ChildComponent />}{" "}
      </CardContent>
      <CardFooter className=" px-6 w-full">
        <Backbutton label={backbuttonlabel} href={backbuttonhref} />
      </CardFooter>
    </Card>
  );
}
