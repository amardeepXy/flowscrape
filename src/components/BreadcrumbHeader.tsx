"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from './ui/breadcrumb';
import Link from 'next/link';
import { MobileSidebar } from './Sidebars';

function BreadcrumbHeader() {
  const pathName = usePathname();
  const pathArray = pathName === '/' ? [""] : pathName.split('/');
  return (
    <div className='flex gap-2 items-center'>
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {pathArray.map((path: string): React.ReactElement => {

            if ((pathArray[pathArray.length - 1] === path) || (pathArray[0] === path && pathArray.length === 1)) {
              return <BreadcrumbItem key={path || "home"}>
                <BreadcrumbPage>{path || "Home"}</BreadcrumbPage>
              </BreadcrumbItem>
            }

            return <React.Fragment key={path} >
              <BreadcrumbItem >
                <BreadcrumbLink asChild>
                  <Link href={`/${path}`}>
                    {path || "Home"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>

          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div >
  )
}

export default BreadcrumbHeader
