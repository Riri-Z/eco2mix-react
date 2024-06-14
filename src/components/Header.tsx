const ERROR_API =
  "Désolé, le serveur n'est pas disponible actuellement, veuillez revenir plus tard";

interface Props {
  error: boolean;
}

export const Header = ({ error }: Props) => {
  return (
    <>
            <h1 className="font-quickSandSemiBold mt-2 text-center text-2xl xl:text-left  lg:text-3xl">
          Données éCO2mix nationales
        </h1>
      {error && (
        <div className="flex">
          <p className="text-red-400">{ERROR_API}</p>
        </div>
      )}
    </>
  );
};
