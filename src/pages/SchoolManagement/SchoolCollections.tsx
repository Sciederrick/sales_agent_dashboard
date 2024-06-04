import { useParams } from "react-router-dom";

const SchoolCollections = () => {
    const { id } = useParams();
    return <>School Collections: {id}</>;
};

export default SchoolCollections;
