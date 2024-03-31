import { useState } from 'react'
import Accordion from './Accordion'
import GithubLogo from '../../assets/svg/github.svg'
import LinkLogo from '../../assets/svg/link.svg'
import ContainerImage from './ContainerImage'
import ExternalLink from './ExternalLink'
import AccordionButton from './AccordionButton'
import TextContainer from './TextContainer'

interface SectionData {
  id: number
  fullName: string
  title: string
  subtitle: string
  shortDescription: string
  longDescription: string
  thumbnail: string
  github: string
  skills: skills[]
  email: string
  tel: string
  linkedin: string
  link: string
}

interface skills {
  id: number
  skillTitle: string
}

function Section({
  data,
  sectionId,
  sectionColors,
  buttonColors,
  skillColors,
  isMobile,
  dataType,
}: {
  data: SectionData | null
  sectionId: string
  sectionColors: string[]
  buttonColors: string[]
  skillColors: string[]
  sectionTitle: string
  isMobile: boolean
  dataType: string
}) {
  const [openAccordion, setOpenAccordion] = useState(false)

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion)
  }

  return (
    <section
      id={sectionId}
      className={`flex flex-col items-center w-full relative bg-${
        dataType === 'project' ? sectionColors[1] : sectionColors[0]
      } md:h-screen md:justify-center bg-gradient-to-r from-transparent from-5% to-${
        dataType === 'project' ? sectionColors[2] : sectionColors[1]
      } ${isMobile ? 'min-h-screen' : ''}`}>
      <div
        id="sectionProfile"
        className="pt-32 pb-10 max-w-screen-lg mx-auto h-3/4 rounded px-4">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <TextContainer
              data={data}
              dataType={dataType}
              skillColors={skillColors}
            />
            <p className="mb-6 leading-6">{data?.shortDescription}</p>
            <div className="py-3" id="moreSection">
              <div className="ml-2 flex md:flex-row items-center gap-4">
                <AccordionButton
                  openAccordion={toggleAccordion}
                  isOpenAccordion={openAccordion}
                  buttonColors={buttonColors}
                  dataType={dataType}
                />
                <ExternalLink
                  link={data?.github}
                  logo={GithubLogo}
                  label="Github"
                  isMobile={isMobile}
                  buttonColors={buttonColors}
                  dataType={dataType}
                />
                <ExternalLink
                  link={
                    data
                      ? dataType === 'project'
                        ? data.link
                        : require('../../assets/CV_Antoine_Jolivet.pdf')
                      : ''
                  }
                  logo={LinkLogo}
                  label={dataType === 'project' ? 'link' : 'CV'}
                  isMobile={isMobile}
                  buttonColors={buttonColors}
                  dataType={dataType}
                />
              </div>
              <Accordion
                openAccordion={openAccordion}
                longDescription={data?.longDescription}
              />
            </div>
          </div>
          <ContainerImage
            image={data?.thumbnail ?? undefined}
            openAccordion={openAccordion}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  )
}

export default Section
