export default function InfoBox ({label,buttonLabel,content}:{label:String,buttonLabel:String,content:any}) {
    return (
        <div className="flex pt-4">
            <h1 className="size-32 text-[#03045E]">{label}</h1>
            {content}          
        </div>
    );
}