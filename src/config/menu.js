// import HelpDeskIcon from '@/icons/help-desk-icon'
import {
  CalendarDays,
  LayoutDashboard,
  Mail,
  MessageSquareMore,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
// import StarIcon from '@/icons/star-icon'
// import TimerIcon from '@/icons/timer-icon'

export const sidebarMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "dashboard",
  },
  {
    label: "Conversations",
    icon: MessageSquareMore,
    path: "conversation",
  },
  {
    label: "Integrations",
    icon: SlidersHorizontal,
    path: "integration",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "settings",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    path: "appointment",
  },
  {
    label: "Email Marketing",
    icon: Mail,
    path: "email-marketing",
  },
];

// export const TABS_MENU: TABS_MENU_PROPS[] = [
//   {
//     label: 'unread',
//     icon: <EmailIcon />,
//   },
//   {
//     label: 'all',
//     icon: <EmailIcon />,
//   },
//   {
//     label: 'expired',
//     icon: <TimerIcon />,
//   },
//   {
//     label: 'starred',
//     icon: <StarIcon />,
//   },
// ]

// export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
//   {
//     label: 'help desk',
//   },
//   {
//     label: 'questions',
//   },
// ]

// export const APPOINTMENT_TABLE_HEADER = [
//   'Name',
//   'RequestedTime',
//   'Added Time',
//   'Domain',
// ]

// export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

// export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
//   {
//     label: 'chat',
//     icon: <ChatIcon />,
//   },
//   {
//     label: 'helpdesk',
//     icon: <HelpDeskIcon />,
//   },
// ]
