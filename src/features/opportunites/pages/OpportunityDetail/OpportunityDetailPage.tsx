import { OpportunityDetailTop } from "./OpportunityDetailTop";
import { TrackingListPage } from "./TrackingListPage";
import { useParams } from "react-router-dom";
export function OpportunityDetailPage() {
  const { id } = useParams();
  return (
    <div>
      <OpportunityDetailTop />
      <TrackingListPage opportunityId={Number(id)}/>,
    </div>
  );
}