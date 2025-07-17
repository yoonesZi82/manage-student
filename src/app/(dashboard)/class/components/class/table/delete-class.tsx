"use client";
import React, { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IconLoader2, IconTrash, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DeleteClass({
  id,
  name,
  trigger = (
    <Button
      size="icon"
      variant="ghost"
      className="z-10 hover:!bg-transparent !p-0 w-fit h-fit"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <IconX className="text-destructive dark:text-black" />
    </Button>
  ),
  api,
}: {
  id: string;
  name: string;
  trigger?: React.ReactNode;
  api: string;
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader className="flex flex-col justify-center items-center gap-2">
            <DialogTitle>حذف {name} </DialogTitle>
            <DialogDescription>
              {`آیا می خواهید ${name} را حذف کنید؟`}
            </DialogDescription>
          </DialogHeader>
          <ShowButton id={id} setOpen={setOpen} name={name} api={api} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="pb-4">
        <DrawerHeader className="flex flex-col justify-center items-center gap-2">
          <DrawerTitle>حذف {name}</DrawerTitle>
          <DrawerDescription>
            {`آیا می خواهید ${name} را حذف کنید؟`}
          </DrawerDescription>
        </DrawerHeader>
        <ShowButton id={id} setOpen={setOpen} name={name} api={api} />
      </DrawerContent>
    </Drawer>
  );
}

function ShowButton({
  id,
  setOpen,
  name,
  api,
}: {
  id: string;
  setOpen: (open: boolean) => void;
  name: string;
  api: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteSubClassMutation = useMutation({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      return axios.delete(api, { data: { id } });
    },
    onSuccess: () => {
      toast.success(`${name} با موفقیت حذف شد.`);
      setOpen(false);
      setIsLoading(false);
    },
    onError: () => {
      toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      setIsLoading(false);
    },
  });

  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <Button
        variant="destructive"
        size="lg"
        onClick={() => deleteSubClassMutation.mutate(id)}
        disabled={isLoading}
      >
        {isLoading ? <IconLoader2 className="animate-spin" /> : <IconTrash />}
        حذف
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="py-5"
        onClick={() => setOpen(false)}
      >
        انصراف
      </Button>
    </div>
  );
}
