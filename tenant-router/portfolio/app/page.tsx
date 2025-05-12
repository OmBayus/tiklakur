import { Mail, Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This simulates a data fetch that takes time
async function getPortfolioData() {
  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // In a real app, you would fetch from an API
  const data = await import("./data.json")
  return data.default
}

export default async function Portfolio() {
  // Fetch data - this will trigger the loading state
  const data = await getPortfolioData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            {data.personal.name}
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </nav>
          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Download CV
          </Button>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-10 space-y-24 px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex flex-col md:flex-row items-center gap-8 md:gap-16 animate-fadeIn">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                {data.personal.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">{data.personal.bio}</p>
            <div className="flex gap-4 pt-4">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </Button>
              <Button
                variant="outline"
                className="border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-300"
              >
                View Projects
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-300 dark:border-purple-800 shadow-xl transform transition-transform hover:scale-105 duration-300">
              <img
                src={data.personal.profileImage || "/placeholder.svg"}
                alt={data.personal.name}
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="scroll-mt-16 py-10 px-4 rounded-2xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm shadow-lg transform hover:shadow-xl transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                About Me
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {data.about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="animate-fadeIn" style={{ animationDelay: `${index * 200}ms` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {data.about.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="scroll-mt-16 py-10 px-4 rounded-2xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.skills.map((skill, index) => (
              <div
                key={skill}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-lg font-medium">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="scroll-mt-16 py-10 px-4 rounded-2xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-purple-700 dark:text-purple-300">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-300"
                  >
                    View Project <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="scroll-mt-16 py-10 px-4 rounded-2xl bg-white/50 dark:bg-gray-800/20 backdrop-blur-sm shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 transform transition-transform hover:translate-x-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <span>{data.personal.email}</span>
                </div>
                <div className="flex items-center gap-3 transform transition-transform hover:translate-x-2">
                  <Github className="h-5 w-5 text-purple-600" />
                  <a href="#" className="hover:underline hover:text-purple-600 transition-colors">
                    {data.personal.github}
                  </a>
                </div>
                <div className="flex items-center gap-3 transform transition-transform hover:translate-x-2">
                  <Linkedin className="h-5 w-5 text-purple-600" />
                  <a href="#" className="hover:underline hover:text-purple-600 transition-colors">
                    {data.personal.linkedin}
                  </a>
                </div>
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Follow Me</h3>
                <div className="flex gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-purple-300 hover:bg-purple-50 hover:border-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-purple-300 hover:bg-purple-50 hover:border-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full border-purple-300 hover:bg-purple-50 hover:border-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-purple-200 dark:border-purple-800 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-purple-200 dark:border-purple-800 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-purple-200 dark:border-purple-800 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-purple-200 dark:border-purple-800 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                    placeholder="Your message"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left px-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.personal.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
