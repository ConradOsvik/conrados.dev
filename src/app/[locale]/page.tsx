import About from './_components/about'
import Skills from './_components/skills'
import Projects from './_components/projects'
import Experience from './_components/experience'
import Education from './_components/education'
import Contact from './_components/contact'
import { Separator } from '~/components/ui/separator'

export default function HomePage() {
    return (
        <div className="flex w-full max-w-xl flex-col gap-8">
            {/* Hero Section */}
            <About />

            {/* Skills Section */}
            <Separator />
            <Skills />

            {/* Projects Section */}
            <Separator />
            <Projects />

            {/* Experience Section */}
            <Separator />
            <Experience />

            {/* Education Section */}
            <Separator />
            <Education />

            {/* Contact Section */}
            <Separator />
            <Contact />
        </div>
    )
}
