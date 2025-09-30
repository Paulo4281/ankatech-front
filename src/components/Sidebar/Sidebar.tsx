"use client"

import { History, House, LayoutDashboard, ChevronDown, ChevronRight, User, LayoutDashboardIcon, Plus, ChartLine, UserPlus, PanelsTopLeft, CircleDollarSign, BanknoteArrowDown } from "lucide-react"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Clientes",
    icon: User,
    children: [
      { title: "Dashboard", icon: LayoutDashboardIcon, url: "/" },
      { title: "Alocações", icon: ChartLine, url: "/alocacoes" },
      { title: "Histórico", icon: History, url: "/historico" },
    ],
  },
  {
    title: "Prospects",
    icon: UserPlus,
    children: [],
  },
  {
    title: "Consolidação",
    icon: User,
    children: [],
  },
  {
    title: "CRM",
    icon: PanelsTopLeft,
    children: [],
  },
  {
    title: "Captação",
    icon: BanknoteArrowDown,
    children: [],
  },
  {
    title: "Financeiro",
    icon: CircleDollarSign,
    children: [],
  },
]

function SidebarComponent() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title)
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-black text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="my-8 flex justify-center">
            <Link href="/">
              <img src="/images/logos/logo-ankatech.png" width="60" />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        className="text-lg font-semibold flex justify-between items-center"
                        onClick={() => toggleDropdown(item.title)}
                      >
                        <div className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                        {openDropdown === item.title ? (
                          <ChevronDown size={18} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </SidebarMenuButton>

                      {openDropdown === item.title && (
                        <div className="ml-8 mt-2 flex flex-col gap-2 transition-all duration-300">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.url}
                              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                            >
                              <child.icon size={16} />
                              <span>{child.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export {
  SidebarComponent as Sidebar
}
