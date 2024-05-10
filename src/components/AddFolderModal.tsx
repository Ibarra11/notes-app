"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";

import { Button } from "./ui/button";
import { FolderPlus, TriangleAlert, Loader } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addFolder } from "../actions/folder.actions";

export default function AddFolderModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [state, formAction] = useFormState(addFolder, null);

  React.useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <FolderPlus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <form className="sm:max-w-md" action={formAction}>
          <FieldSet>
            <DialogHeader>
              {state?.success === false && (
                <div className="flex gap-2 bg-red-300 text-red-700 rounded p-2 mb-1">
                  <TriangleAlert className="shrink-0" size={16} />
                  <p className="text-xs  font-semibold">{state.message}</p>
                </div>
              )}
              <DialogTitle>New Folder</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-4 my-4">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" required type="text" />
            </div>
            <DialogFooter className="sm-justify-start">
              <DialogClose asChild>
                <Button size="sm" type="button" variant="link">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                size="sm"
                className="group relative w-20"
                variant="default"
              >
                <span className="group-disabled:invisible">Ok</span>
                <span className="hidden group-disabled:grid place-content-center absolute inset-0">
                  <Loader className="size-4 animate-spin" />
                </span>
              </Button>
            </DialogFooter>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldSet({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <fieldset className="block" disabled={pending}>
      {children}
    </fieldset>
  );
}
