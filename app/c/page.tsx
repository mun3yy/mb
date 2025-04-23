import MainNav from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, Globe, Lock, Zap, RefreshCw, Palette, Monitor, Moon, Sun, Laptop } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <MainNav />

      <main className="flex-1 ml-16 md:ml-64 p-6">
        <div className="max-w-4xl mx-auto pt-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <Tabs defaultValue="appearance">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="proxy">Proxy</TabsTrigger>
              <TabsTrigger value="cloaking">Cloaking</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Theme</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <ThemeOption icon={Sun} label="Light" />
                  <ThemeOption icon={Moon} label="Dark" active />
                  <ThemeOption icon={Laptop} label="System" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">Enable UI animations</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Display</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebar">Show Sidebar</Label>
                      <p className="text-sm text-muted-foreground">Display the navigation sidebar</p>
                    </div>
                    <Switch id="sidebar" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Use a more compact UI layout</p>
                    </div>
                    <Switch id="compact" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="proxy" className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Proxy Settings</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="proxy-method">Default Proxy Method</Label>
                    <select
                      id="proxy-method"
                      className="w-full mt-1 bg-background border border-border rounded-md p-2 text-foreground"
                    >
                      <option value="bare">Bare Server (Recommended)</option>
                      <option value="corsproxy">CORS Proxy</option>
                      <option value="alloy">Alloy Proxy</option>
                      <option value="womginx">Womginx</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Different proxy methods work better for different sites
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="bare-server">Bare Server URL</Label>
                    <Input
                      id="bare-server"
                      defaultValue="/ca/"
                      className="bg-background border-border text-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">The endpoint for the Bare server</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-proxy">Auto Proxy Selection</Label>
                      <p className="text-sm text-muted-foreground">Automatically select the best proxy method</p>
                    </div>
                    <Switch id="auto-proxy" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="cache-assets">Cache Assets</Label>
                      <p className="text-sm text-muted-foreground">Cache images and other assets for faster loading</p>
                    </div>
                    <Switch id="cache-assets" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Performance</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compression">Enable Compression</Label>
                      <p className="text-sm text-muted-foreground">Compress data to improve loading speed</p>
                    </div>
                    <Switch id="compression" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="prefetch">Prefetch Links</Label>
                      <p className="text-sm text-muted-foreground">Preload links for faster navigation</p>
                    </div>
                    <Switch id="prefetch" />
                  </div>

                  <Button className="w-full mt-2" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cloaking" className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Tab Cloaking</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-cloaking">Enable Tab Cloaking</Label>
                      <p className="text-sm text-muted-foreground">Disguise this tab as another website</p>
                    </div>
                    <Switch id="enable-cloaking" />
                  </div>

                  <div>
                    <Label htmlFor="cloak-title">Tab Title</Label>
                    <Input
                      id="cloak-title"
                      placeholder="Google Classroom"
                      className="bg-background border-border text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cloak-icon">Favicon URL</Label>
                    <Input
                      id="cloak-icon"
                      placeholder="https://ssl.gstatic.com/classroom/favicon.png"
                      className="bg-background border-border text-foreground"
                    />
                  </div>

                  <div>
                    <Label>Preset Cloaks</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Button variant="outline" size="sm" className="justify-start">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
                        Google
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <img
                          src="https://ssl.gstatic.com/classroom/favicon.png"
                          alt="Google Classroom"
                          className="w-4 h-4 mr-2"
                        />
                        Classroom
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <img src="https://drive.google.com/favicon.ico" alt="Google Drive" className="w-4 h-4 mr-2" />
                        Drive
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <img src="https://docs.google.com/favicon.ico" alt="Google Docs" className="w-4 h-4 mr-2" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Stealth Mode</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="about-blank">About:Blank Cloaking</Label>
                      <p className="text-sm text-muted-foreground">Open in about:blank page to bypass filters</p>
                    </div>
                    <Switch id="about-blank" />
                  </div>

                  <Button className="w-full" variant="default">
                    <Lock className="mr-2 h-4 w-4" />
                    Open in Stealth Mode
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-2xl">I</span>
                  </div>
                  <h2 className="text-2xl font-bold">Interstellar</h2>
                  <p className="text-muted-foreground">Version 5.2.5</p>
                </div>

                <div className="space-y-4 text-center">
                  <p>
                    Interstellar is a web proxy service designed to help you browse the web freely, access blocked
                    content, and protect your privacy online.
                  </p>

                  <div className="flex justify-center gap-4">
                    <Button variant="outline">Check for Updates</Button>
                    <Button variant="default">Report an Issue</Button>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold mb-4">Credits</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Bare Server:</strong>{" "}
                    <span className="text-muted-foreground">@nebula-services/bare-server-node</span>
                  </li>
                  <li>
                    <strong>UI Framework:</strong> <span className="text-muted-foreground">Next.js & Tailwind CSS</span>
                  </li>
                  <li>
                    <strong>Icons:</strong> <span className="text-muted-foreground">Lucide Icons</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ThemeOption({ icon: Icon, label, active = false }) {
  return (
    <div
      className={`border ${active ? "border-primary" : "border-border"} rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors`}
    >
      <div
        className={`w-10 h-10 rounded-full ${active ? "bg-primary" : "bg-secondary"} flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${active ? "text-white" : "text-foreground"}`} />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
