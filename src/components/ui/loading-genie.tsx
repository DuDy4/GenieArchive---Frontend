import Genie from "/images/loading-logo.png";

interface LoadingGenieProps {
    withLoadingCircle: boolean;
}

const LoadingGenie: React.FC<LoadingGenieProps> = ({ withLoadingCircle }) => {
    return (
        <div className="h-full flex flex-col text-center gap-[12px] py-0 px-[68px] items-center justify-center">
            <div className="icon-container relative">
                <img src={Genie} alt="Genie AI" className="icon" />
                {withLoadingCircle && <div className="loading-circle"></div>}
                <div className="sparkles">
                    <div className="sparkle sparkle1"><img src="/images/starlight1.png" /></div>
                    <div className="sparkle sparkle2"><img src="/images/starlight2.png" /></div>
                    <div className="sparkle sparkle3"><img src="/images/starlight3.png" /></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingGenie;
