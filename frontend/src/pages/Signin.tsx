import { AuthComp } from "../components/AuthComp"
import { Quote } from "../components/Quote"

export const Signin = () => {
  return <div className="">
    <div className="grid grid-cols-1 lg:grid-cols-2">

      <div>
        <AuthComp type="signin"></AuthComp>
      </div>

      <div className="invisible lg:visible">

        <Quote></Quote>

      </div>
    </div>
  </div>
}
