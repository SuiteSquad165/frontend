export default function SearchBarItemForm({title, content}:{title:string, content:any}) {
    return (
        <div className="rounded-sm border-2 p-2 active:border-blue-500">
            <p className="text-gray-500 text-xs">{title}</p>
            {content}
        </div>
    );
}