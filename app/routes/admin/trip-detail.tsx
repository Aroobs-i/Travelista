import type { LoaderFunctionArgs } from "react-router"
import { getTripById } from "~/apppwrite/trips";
import type { Route } from "./+types/trip-detail";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import { Header, InfoPill } from "components";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;

    if (!tripId) throw new Error ('Trip id is required');
    
    return await getTripById(tripId);
}

const tripDetail = ({ loaderData }: Route.ComponentProps) => {
    const imageUrls = loaderData?.imageUrls || [];
    const tripData = parseTripData(loaderData?.tripDetail);

    const { 
        name, duration, itinerary, travelStyle, groupType, budget, 
        interests, estimatedPrice, description, bestTimeToVisit, weatherInfo, country
     } = tripData || {};

     const pillItems = [
        { text: travelStyle, bg: '!bg-pink-50 !text-pink-500'},
        { text: groupType, bg: '!bg-primary-50 !text-primary-500'},
        { text: budget, bg: '!bg-success-50 !text-success-700'},
        { text: interests, bg: '!bg-navy-50 !text-navy-500'},
     ]

  return (
    <main className="travel-detail wrapper">
        <Header title="Trip Details" description="View and edit AI generated travel plans"/>
        <section className="container wrapper-md">
            <header>
                <h1 className="p-40-semibold text-dark-100 ">
                    {name}
                    </h1>
                    <div className="flex items-center gap-5">
                    <InfoPill
                      text = {`${duration} day plan`}
                      image = "/assets/icons/calendar.svg"
                       />
                    <InfoPill
                      text = {itinerary?.slice(0,2)
                      .map((item) => item.location).join(', ') || ''
                        }
                       image = "/assets/icons/location-mark.svg"
                    />
                    </div>
            </header>
            <section className="gallery">
                {imageUrls.map((url: string, i: number) =>(
                    <img
                     src={url} 
                     key={i}
                     className={cn('w-full rounded-xl object-cover', i === 0 ? 'md:col-span-2 md:row-span-2 h-[330px]'
                        :'md:row-span-1 h-[150px]'
                     )}
                      />
                ))}
            </section>
            <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                <ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {pillItems.map((pill, i)=>(
                            <ChipDirective
                                key={i}
                                text={getFirstWord(pill.text)}
                                cssClass={`${pill.bg} !text-base !font-medium !px-4 `}
                            />
                        ))}

                    </ChipsDirective>
                </ChipListComponent>
                <ul className="flex gap-1 items-center">
                    {Array(5).fill('null').map((_, index) => (
                        <li key={index}>
                            <img 
                             src="/assets/icons/star.svg"
                             alt="star"
                             className="size-[18px]"
                              />
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    </main>
  )
}

export default tripDetail