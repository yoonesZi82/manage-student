"use client";

import React, { useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserTypes from "@/types/user/UserTypes";
import useGetUsers from "@/query-api/useGetUsers";
import { IconLoader, IconLoader2 } from "@tabler/icons-react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const AddUser = ({
  SubClassUsers,
  id,
}: {
  SubClassUsers: { user: UserTypes }[] | undefined;
  id: string;
}) => {
  const { data: allUsers = [], isPending } = useGetUsers();
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const subClassUserIds = useMemo(
    () => SubClassUsers?.map((s) => s.user.id) ?? [],
    [SubClassUsers]
  );

  const filteredUsers = useMemo(() => {
    return allUsers
      .filter((user) => !subClassUserIds.includes(user.id))
      .filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allUsers, subClassUserIds, searchTerm]);

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedUsers.includes(id);

  const [loading, setLoading] = useState(false);

  const handleAddUsers = () => {
    setLoading(true);
    createUserMutation.mutate();
  };

  const createUserMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      return axios.post("/api/sub-class-user/create", {
        subClassId: id,
        userIds: selectedUsers,
      });
    },
    onSuccess: async () => {
      setLoading(false);
      toast.success("کاربران با موفقیت افزوده شدند.");
      setOpen(false);
      setSelectedUsers([]);
      location.reload();
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      if (err.response?.status === 401) {
        toast.error("کاربران قبلا افزوده شده اند.");
        return;
      } else {
        toast.error("مشکلی پیش آمد، لطفاً دوباره تلاش کنید.");
      }
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(true)} disabled={loading}>
        افزودن کاربر
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
        <CommandInput
          placeholder="جستجوی کاربر با نام ..."
          onValueChange={setSearchTerm}
          disabled={filteredUsers.length === 0}
        />
        {isPending ? (
          <div className="flex justify-center items-center py-10">
            <IconLoader size={16} className="animate-spin" />
          </div>
        ) : (
          <CommandList>
            <CommandEmpty>کاربری یافت نشد.</CommandEmpty>
            <CommandGroup
              heading="کاربران"
              className={cn(filteredUsers.length === 0 && "hidden")}
            >
              {filteredUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => toggleUser(user.id)}
                  className={cn(
                    "flex justify-between items-center cursor-pointer",
                    isSelected(user.id) ? "opacity-50" : "opacity-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="ring-2 ring-primary size-10 cursor-pointer">
                      <AvatarImage
                        src={
                          user.gender === "male"
                            ? "https://api.dicebear.com/9.x/avataaars/svg?seed=Luis"
                            : "https://api.dicebear.com/9.x/avataaars/svg?seed=Alexander"
                        }
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0) ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <p>{user.name}</p>
                      <p>{user.city}</p>
                    </div>
                  </div>
                  {isSelected(user.id) && (
                    <Check className="w-4 h-4 text-black" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}

        <CommandSeparator />
        <div className="flex flex-col gap-3 px-4 py-3">
          <AnimatePresence>
            {selectedUsers.length > 0 && (
              <motion.div
                key="selected-users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex justify-between items-center gap-10 w-full"
              >
                <div className="flex flex-wrap w-full">
                  <AnimatePresence>
                    {selectedUsers.map((id, index) => {
                      const user = allUsers.find((u) => u.id === id.toString());
                      return (
                        <motion.div
                          key={id}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: index * 0.05,
                          }}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="hover:z-10 -ml-2 transition-all duration-150">
                                <Avatar className="ring-2 ring-primary size-10 cursor-pointer">
                                  <AvatarImage
                                    src={
                                      user?.gender === "male"
                                        ? "https://api.dicebear.com/9.x/avataaars/svg?seed=Luis"
                                        : "https://api.dicebear.com/9.x/avataaars/svg?seed=Alexander"
                                    }
                                  />
                                  <AvatarFallback>
                                    {user?.name?.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{user?.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
                <Button onClick={() => handleAddUsers()} disabled={loading}>
                  {loading ? (
                    <IconLoader2 size={16} className="animate-spin" />
                  ) : (
                    "افزودن کاربر"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/users/add">ایجاد کاربر جدید</Link>
          </Button>
        </div>
      </CommandDialog>
    </>
  );
};

export default AddUser;
