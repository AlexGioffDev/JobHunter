const year = new Date(Date.now()).getFullYear();

export default function Footer() {
  return (
    <footer className="flex justify-between  items-center fixed bg-accent bottom-0 w-full p-4 text-background">
      <p className="text-sm font-light">AlexGioffre©{year.toString()}</p>
      <p className=" text-sm font-light">Via Jobicy</p>
    </footer>
  );
}
