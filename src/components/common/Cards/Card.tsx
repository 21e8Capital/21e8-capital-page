const Card = ({ title, icon, para }: Card) => {
  return (
    <div className="flex flex-col pl-4 pt-2 pb-3 pr-1 md:pr-5 text-base border-2 border-primary-lighter bg-white">
      <header className="flex flex-row pb-1 mb-1 md:mb-3 items-center">
        {icon && <span>{icon}</span>}
        <p className="font-bold">{title}</p>
      </header>
      <div className="flex flex-row text-sm">
        {icon && <div className="min-w-[20px] mr-2" />}
        <p>{para}</p>
      </div>
    </div>
  );
};

export default Card;
