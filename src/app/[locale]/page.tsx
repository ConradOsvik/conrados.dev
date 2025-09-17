import About from './_components/about'
import Skills from './_components/skills'
import Projects from './_components/projects'
import Experience from './_components/experience'
import Education from './_components/education'
import Contact from './_components/contact'
import { Separator } from '~/components/ui/separator'

export default function Home() {
    return (
        <div>
            <About />
            <Separator className="my-8" />
            <Skills />
            <Separator className="my-8" />
            <Projects />
            <Separator className="my-8" />
            <Experience />
            <Separator className="my-8" />
            <Education />
            <Separator className="my-8" />
            <Contact />
        </div>
    )
}
