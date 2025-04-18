import React from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Pagination, ButtonGroup, IconButton, HStack } from '@chakra-ui/react';
import { PaginationComponentProps } from '@/helpers/types';

function PaginationComponent({ size, count,page, pageSize, variant, onPageChange, ...rest }: PaginationComponentProps) {
    return (
        <Pagination.Root count={count} page={page} onPageChange={onPageChange} pageSize={pageSize} defaultPage={1} key={size || "sm"} {...rest}>
            <ButtonGroup variant={variant || "ghost"} size={size || "sm"}>
                <Pagination.PrevTrigger asChild>
                    <IconButton>
                        <LuChevronLeft />
                    </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                            {page.value}
                        </IconButton>
                    )}
                />

                <Pagination.NextTrigger asChild>
                    <IconButton>
                        <LuChevronRight />
                    </IconButton>
                </Pagination.NextTrigger>
            </ButtonGroup>
        </Pagination.Root>
    )
}

export default PaginationComponent