'use client';

import type React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Bell, Lock, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container w-full space-y-8 ">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        {/* Responsive Tab Navigation */}
        <div className="overflow-x-auto sm:overflow-x-hidden">
          <TabsList className="flex sm:grid sm:grid-cols-3 gap-2 w-full  bg-muted px-2  min-h-[56px] rounded-full">
            <TabsTrigger
              value="profile"
              className="cursor-pointer rounded-full flex items-center gap-2 justify-center sm:justify-start  px-4 py-2 text-sm whitespace-nowrap transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:z-10"
            >
              <User className="h-4 w-4 " />
              <span className="hidden sm:inline ">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="cursor-pointer rounded-full flex items-center gap-2 justify-center sm:justify-start  px-4 py-2 text-sm whitespace-nowrap transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:z-10"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="cursor-pointer rounded-full  flex items-center gap-2 justify-center sm:justify-start  px-4 py-2 text-sm whitespace-nowrap transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:z-10"
            >
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    defaultValue="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button className="w-full sm:w-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <Separator />
                {[
                  {
                    id: 'email-marketing',
                    label: 'Marketing emails',
                    desc: 'Receive emails about new products.',
                  },
                  {
                    id: 'email-social',
                    label: 'Social notifications',
                    desc: 'Receive notifications for social activity.',
                  },
                  {
                    id: 'email-security',
                    label: 'Security emails',
                    desc: 'Get notified of account activity.',
                  },
                ].map(({ id, label, desc }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between flex-wrap gap-4"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={id}>{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch id={id} defaultChecked />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <Separator />
                {[
                  {
                    id: 'push-everything',
                    label: 'Push notifications',
                    desc: 'Notifications on this device.',
                  },
                  {
                    id: 'push-mentions',
                    label: 'Mentions',
                    desc: 'When you are mentioned.',
                  },
                  {
                    id: 'push-messages',
                    label: 'Direct messages',
                    desc: 'For direct messages.',
                  },
                ].map(({ id, label, desc }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between flex-wrap gap-4"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={id}>{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch id={id} defaultChecked={id !== 'push-everything'} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button className="w-full sm:w-auto">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data and visibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Visibility</h3>
                <Separator />
                {[
                  {
                    id: 'public-profile',
                    label: 'Public profile',
                    desc: 'Visible to everyone.',
                    checked: true,
                  },
                  {
                    id: 'show-email',
                    label: 'Show email',
                    desc: 'Other users see your email.',
                    checked: false,
                  },
                  {
                    id: 'online-status',
                    label: 'Online status',
                    desc: 'Show your activity status.',
                    checked: true,
                  },
                ].map(({ id, label, desc, checked }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between flex-wrap gap-4"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={id}>{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch id={id} defaultChecked={checked} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Usage</h3>
                <Separator />
                {[
                  {
                    id: 'usage-data',
                    label: 'Usage data',
                    desc: 'Allow analytics.',
                    checked: true,
                  },
                  {
                    id: 'cookies',
                    label: 'Cookies',
                    desc: 'Enhance browsing experience.',
                    checked: true,
                  },
                ].map(({ id, label, desc, checked }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between flex-wrap gap-4"
                  >
                    <div className="space-y-0.5">
                      <Label htmlFor={id}>{label}</Label>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                    <Switch id={id} defaultChecked={checked} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Actions</h3>
                <Separator />
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="space-y-0.5">
                    <Label>Delete account</Label>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove your account and data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button className="w-full sm:w-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
