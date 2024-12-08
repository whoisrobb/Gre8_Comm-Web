"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useChannelStore } from '@/store/channel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateChannel } from "@/hooks/use-create-channel";
import { useAuth } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { toast } from "sonner";

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
});

const CreateChannel = () => {
    const { open, setOpen } = useChannelStore(state => state);
    const { mutateAsync, isPending } = useCreateChannel();
    const { userId } = useAuth();
    const params = useParams<{ workspaceId: string }>();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutateAsync({
            userId: userId!,
            ...values,
            workspaceId: params.workspaceId as Id<"workspaces">
        }, {
            onSuccess: (id) => {
                setOpen(false);
                router.replace(`/workspace/${params.workspaceId}/channel/${id}`);
                form.reset();
            },
            onError: () => {
                toast.error('Failed to create channel');
            }
        });
    }
    
  return (
    <Dialog
        open={open}
        onOpenChange={setOpen}
    >
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Create channel</DialogTitle>
                <DialogDescription>
                    Enter a name for your new channel. Spaces will be replaced with hyphens and the name will be converted to lowercase.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Channel name</FormLabel>
                                <FormControl>
                                    <Input placeholder="my-new-channel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button disabled={isPending} type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateChannel;
