import { useContext } from 'react';
import { TypeContext } from "@/components/Layout/Layout";
import { ParameterType, ApplicationType } from './ParameterType';

export const TypeLink = ({ linkData }) => {
    const { setModalData, modalOpen, addBreadCrumb } = useContext(TypeContext);
    const name = linkData.name;

    const onClickHandler = () => {
        setModalData(linkData);
        addBreadCrumb(linkData);
        modalOpen();
    }

    if (linkData.type === 'application') {
        return <ApplicationType data={linkData} />
    } else if (linkData.type === 'interface' || linkData.type === 'object') {
        return <ParameterType typeData={linkData} />
    } else {
        return <a className={'type-link'} onClick={onClickHandler}>{name}</a>
    }
}