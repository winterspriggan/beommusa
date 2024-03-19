import React, {useState} from 'react'
import MyInfo from './MyInfo/MyInfo'
import DevelopProduct from './DevelopProduct/DevelopProduct'
import Underwrite from "./Underwrite/Underwrite";
import CreateAnswer from "./CreateAnswer/CreateAnswer";
import ViewProducts from "./ViewProducts/ViewProducts";
import CreateReport from "./CreateReport/CreateReport";
import ReviewClaim from "./ReviewClaim/ReviewClaim";
import PayCompensation from "./PayCompensation/PayCompensation";
import ViewCustomerStatistics from "./ViewCustomerStatistics/ViewCustomerStatistics";
import ViewClaimStatistics from "./ViewClaimStatistics/ViewClaimStatistics";

export default function MainContents({panelName, employee}) {
    if (panelName === 'MyInfo') return (<MyInfo employee={employee}/>)
    else if (panelName === 'DevelopProduct') return (<DevelopProduct employee={employee}/>)
    else if (panelName === 'Underwrite') return (<Underwrite employee={employee}/>)
    else if (panelName === 'CreateAnswer') return (<CreateAnswer employee={employee}/>)
    else if (panelName === 'ViewProducts') return (<ViewProducts employee={employee}/>)
    else if (panelName === 'CreateReport') return (<CreateReport employee={employee}/>)
    else if (panelName === 'ReviewClaim') return (<ReviewClaim employee={employee}/>)
    else if (panelName === 'PayCompensation') return (<PayCompensation employee={employee}/>)
    else if (panelName === 'ViewCustomerStatistics') return (<ViewCustomerStatistics/>)
    else if (panelName === 'ViewClaimStatistics') return (<ViewClaimStatistics/>)
}