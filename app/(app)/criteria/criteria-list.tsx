import { getProjectCriteria } from "@/lib/data/criteria"
import CriteriaClientView from "./criteria-client-view"

const CriteriaList = async () => {
  const criterias = await getProjectCriteria()

  return <CriteriaClientView criterias={criterias} />
}

export default CriteriaList
