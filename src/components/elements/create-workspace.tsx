"use client";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";  
import { useWorkspaceStore } from '@/store/workspace';
import { useRouter } from "next/navigation";
import { useCreateWorkspace } from "@/hooks/use-create-workspace";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
 
const workspaceSchema = z.object({
    name: z.string().min(3, {
        message: "Workspace name must be at least 3 characters.",
    }),
    // userId: z.string().min(3, {
    //     message: "Must be signed in.",
    // }),
});

type WorkspaceSchemaProps = z.infer<typeof workspaceSchema>;

const CreateWorkspace = () => {
    const { mutateAsync, isPending } = useCreateWorkspace();
    const router = useRouter();
    const { userId: _userId } = useAuth();

    const { open, setOpen } = useWorkspaceStore();
    const form = useForm<WorkspaceSchemaProps>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
            // userId: ""
        }
    });

    const onSubmit = (values: WorkspaceSchemaProps) => {
        
    let folderWorkspacePromise = () => mutateAsync({ ...values, userId: _userId! });
        toast.promise(folderWorkspacePromise(), {
            loading: 'Creating workspace...',
            success: (data) => {
                setOpen(false);
                router.push(`/workspaces/${data}`)
                return 'Successfully created workspace';
            },
            error: (error) => {
                return error.message || 'Failed to create workspace';
            },
        });
    };
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create workspace</DialogTitle>
                <DialogDescription>
                    
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Workspace name e.g. 'Personal', 'Work' or 'Home'" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <Button disabled={isPending} type="submit">Create</Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  
  )
}

export default CreateWorkspace
