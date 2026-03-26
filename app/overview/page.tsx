import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CloudRain, Swords, Crown } from "lucide-react";

export const metadata = {
  title: "Overview — Battle of Waterloo",
};

export default function OverviewPage() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="h-12 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex items-center px-3 sm:px-4 shrink-0 sticky top-0 z-10">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Interactive Map</span>
        </Link>
        <Separator orientation="vertical" className="mx-3 h-5" />
        <h1 className="text-sm font-semibold tracking-tight">Overview</h1>
        <Badge variant="outline" className="text-[10px] font-normal ml-2 hidden sm:flex">
          June 18, 1815
        </Badge>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            The Battle of Waterloo
          </h2>
          <p className="text-muted-foreground text-sm">
            The battle that ended Napoleon&apos;s rule and brought peace to Europe, June 18, 1815
          </p>
        </div>

        <Separator />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CloudRain className="h-4 w-4 text-muted-foreground" />
              Weather &amp; Terrain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The night before the battle, a heavy thunderstorm hit the area.
              By morning the whole battlefield was soaked. The fields were
              muddy, the roads were soft, and everything was wet.
            </p>
            <p>
              Because of this, Napoleon had to wait about three hours before
              attacking. He needed the ground to dry a bit so his cannons would
              work properly. In wet mud, cannonballs just sink instead of
              bouncing and causing damage. This delay gave the Prussian army
              extra time to march to the battlefield and help the Allies.
            </p>
            <p>
              The mud made everything harder for the French. Soldiers sank into
              the ground while marching. Horses struggled to charge through the
              soft fields. Moving heavy cannons was exhausting. All of this
              slowed down the French attacks, while the Allied army had the
              advantage of defending from higher, drier ground on a ridge.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Swords className="h-4 w-4 text-muted-foreground" />
              What the Battle Was About
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              In March 1815, Napoleon escaped from his exile on the island of
              Elba and came back to France, quickly taking power again. The
              other European nations (Britain, Prussia, Austria, and Russia)
              joined together to stop him and started gathering their armies.
            </p>
            <p>
              Napoleon&apos;s plan was to move fast into Belgium and beat the two
              closest enemy armies one at a time: Wellington&apos;s Allied army
              and Blücher&apos;s Prussian army, before the others could arrive.
            </p>
            <p>
              Two days before Waterloo, he partly succeeded by beating the
              Prussians at Ligny. But they weren&apos;t fully defeated. They
              pulled back and stayed close enough to help Wellington later.
              On June 18, Napoleon attacked Wellington&apos;s position on a ridge
              near the village of Waterloo. About 72,000 French soldiers faced
              68,000 Allied defenders, and during the afternoon 50,000 Prussians
              arrived to tip the balance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Crown className="h-4 w-4 text-muted-foreground" />
              Napoleon&apos;s Aftermath
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              Napoleon lost badly. His army fell apart during the evening.
              About 25,000 French soldiers were killed or wounded, and another
              8,000 were captured. Prussian cavalry chased the survivors through
              the night. Napoleon escaped back to Paris.
            </p>
            <p>
              Four days later, on June 22, he gave up power for the second time.
              He tried to flee to America, but the British navy blocked the
              ports. In July he surrendered to the British.
            </p>
            <p>
              The British sent him to Saint Helena, a tiny island in the
              middle of the South Atlantic Ocean, far from everything. He lived
              there for six years until his death on May 5, 1821. The Battle of
              Waterloo ended over twenty years of war in Europe and brought a
              long period of peace.
            </p>
          </CardContent>
        </Card>

        <div className="pt-4 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            ← Back to Interactive Map
          </Link>
        </div>
      </main>
    </div>
  );
}
