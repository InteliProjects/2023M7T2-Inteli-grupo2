import { PropsWithChildren } from "react";

function DashMainSection({ children}: PropsWithChildren) {
    return ( 
        <div className="font-montserrat py-12 pl-64 pr-16">
                {children}
        </div>
    );
}

export default DashMainSection;