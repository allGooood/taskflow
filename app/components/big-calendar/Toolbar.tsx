
interface ToolbarProps {
    label: string;
    onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => void;
}
  
const Button = ({ 
    children, onClick
}: { 
    children: React.ReactNode,
    onClick?: () => void,
}) => 
    (<button 
        onClick={onClick}
        style = {{ 
            background: '#4f46e5', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            cursor: 'pointer',
        }}
    >
        {children}
    </button>);



const Toolbar = ({ 
    label, 
    onNavigate 
}: ToolbarProps) => {
    return (
        <div className="rbc-toolbar flex items-center gap-2 mb-4">
            <Button onClick={() => onNavigate?.('TODAY')}>
                Today
            </Button>
            <Button onClick={() => onNavigate?.('PREV')}>
                ◀
            </Button>
            <span className="rbc-toolbar-label font-bold">{label}</span>
            <Button onClick={() => onNavigate?.('NEXT')}>
                ▶
            </Button>
        </div>
    );
};
  
export default Toolbar;



    