import { Subtitle, Title, Card, CardHeader, CardContent } from "@/components/ui";
import User from "@assets/images/user.svg";

export const UserIcon = () => {
  return (<img src={User} alt="User icon" />);
};
const team = [
  {
    title: "1+",
    subtitle: "Psicólogos Clínicos",
    icon: <UserIcon/>
  },
  {
    title: "2+",
    subtitle: "Desarrolladores",
    icon: <UserIcon/>
  },
  {
    title: "2+",
    subtitle: "Especialistas en IA",
    icon: <UserIcon/>
  },
  {
    title: "2+",
    subtitle: "Investigadores",
    icon: <UserIcon/>
  }
]
export const AboutTeam = () => {
  return (
    <div className="bg-white pt-10 pb-30">
      <div className="flex flex-col items-center gap-5 max-w-[1440px] mx-auto">
        <Title type="secondary">Nuestro Equipo</Title>
        <Subtitle type="secondary">Un equipo multidisciplinario comprometido con la salud mental</Subtitle>
        <div className="flex gap-20 justify-evenly w-full flex-wrap">
          {team.map((member) => (
            <Card className="rounded border border-indigo-300 flex flex-col text-center items-center max-w-70 min-w-60 min-h-40 px-5">
              <CardHeader>
                <div className="flex justify-center">
                  {member.icon}
                </div>
                <h3 className="text-foreground font-semibold text-3xl">{member.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground font-semibold text-xl">{member.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
