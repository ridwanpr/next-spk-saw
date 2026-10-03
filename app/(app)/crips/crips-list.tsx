import { getProjectCriteria } from "@/lib/data/criteria"
import CripsClientView from "./crips-client-view"

const CripsList = async () => {
  const criterias = await getProjectCriteria()

  return (
    <div>
      <CripsClientView criterias={criterias} />
    </div>
  )
}

export default CripsList
