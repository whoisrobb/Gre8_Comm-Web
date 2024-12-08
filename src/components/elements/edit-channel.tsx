"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateChannel } from "@/hooks/use-update-channel";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Channel name must be at least 2 characters.",
    })
    .max(50, {
      message: "Channel name must not be longer than 50 characters.",
    })
    .transform((value) => value.replace(/\s+/g, "-").toLowerCase()),
})

type EditChannelFormProps = {
  initialName: string;
  channelId: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditChannelForm({ initialName, channelId, setOpen }: EditChannelFormProps) {
    const { mutateAsync, isPending } = useUpdateChannel();
    const { userId } = useAuth();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialName,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateAsync({
            ...values,
            userId: userId!,
            channelId: channelId as Id<"channels">,
        }, {
            onSuccess: () => {
                toast.success("Channel updated successfully");
                setOpen(false);
                form.reset();
            },
            onError: () => {
                toast.error("Failed to update channel");
            }
        })
    }

  return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Channel name</FormLabel>
                        <FormControl>
                            <Input placeholder="my-channel-name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-2">
                    <Button type="submit" disabled={isPending}>Save changes</Button>
                    <Button type="button" variant="secondary">Cancel</Button>
                </div>
            </form>
        </Form>
  )
}

