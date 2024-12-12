"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { ChevronDown } from 'lucide-react';

type ConversationHeaderProps = {
    title: string;
    memberImage?: string;
    onClick?: () => void;
}

const ConversationHeader = ({ title = "Member", memberImage, onClick }: ConversationHeaderProps) => {
    const avatarFallback = title.charAt(0).toUpperCase();

  return (
    <div className='border-b h-[49px] flex items-center px-4'>
        <Button
            variant='ghost'
            size='sm'
            className='text-lg font-semibold px-2 overflow-hidden w-auto'
            onClick={onClick}
        >
            <Avatar className='size-6 mr-2'>
                <AvatarImage src={memberImage} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className='truncate'>{title}</span>
            <ChevronDown className='size-2.5 ml-2' />
        </Button>
    </div>
  )
}

export default ConversationHeader;
