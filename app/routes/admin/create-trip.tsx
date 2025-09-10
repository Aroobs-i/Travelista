import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components"

const createTrip = () => {

    const handleSubmit = async () => { };

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
        <Header
        title="Add a New Trip" 
        description="View and Edit AI-generated travel plans."/>

        <section className="mt-2.5 wrapper-md">
            <form className="trip-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="country">
                        Country
                    </label>
                    <ComboBoxComponent
                    id="country"
                    dataSource={['title','title1']}
                    />
                </div>
            </form>

        </section>
    </main>
  )
}

export default createTrip