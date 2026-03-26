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
            The decisive engagement that ended the Napoleonic Wars — June 18, 1815
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
              On the night of June 17, a violent thunderstorm soaked the Belgian
              countryside. By dawn the battlefield was a quagmire — sodden fields
              of rye and wheat, deeply rutted farm tracks, and waterlogged hollows
              that turned every movement into an ordeal.
            </p>
            <p>
              Napoleon, who relied on rapid manoeuvre and massed artillery,
              was forced to delay his attack from the planned 9:00 AM until
              approximately 11:30 AM, waiting for the ground to firm enough for
              cannonballs to ricochet effectively rather than burying themselves
              in mud. This three-hour delay proved fateful — it gave the
              Prussian army under Blücher crucial extra time to march from Wavre
              and intervene on the battlefield.
            </p>
            <p>
              The mud hampered every arm of the French military. Infantry columns
              struggled to maintain formation as soldiers sank ankle-deep in
              mire. Cavalry charges, normally devastating at speed, were slowed
              to a laboured trot as horses stumbled through the soft ground.
              Artillery crews found it exhausting to reposition their heavy
              guns, and the wet earth absorbed much of the impact of cannonballs,
              dramatically reducing their killing range. The conditions
              particularly disadvantaged the attacking French, who had to cross
              the exposed valley under fire while the Allied defenders held the
              drier, firmer ridge above.
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
              In March 1815, Napoleon Bonaparte escaped from exile on the island
              of Elba and returned to France, rapidly reclaiming power in the
              dramatic episode known as the Hundred Days. The allied nations of
              Europe — Britain, Prussia, Austria, and Russia — immediately formed
              the Seventh Coalition and began mobilising massive armies to depose
              him once more.
            </p>
            <p>
              Napoleon knew he could not defeat all the Coalition armies
              simultaneously. His strategy was to strike quickly into Belgium,
              driving a wedge between the two nearest threats: the Duke of
              Wellington&apos;s Anglo-Allied army and Field Marshal Blücher&apos;s
              Prussian army. By defeating them separately before Austrian and
              Russian forces could arrive, he hoped to shatter the Coalition&apos;s
              resolve and negotiate peace from a position of strength.
            </p>
            <p>
              On June 16 he partially succeeded, defeating the Prussians at Ligny
              and holding Wellington at Quatre Bras. But the Prussians were not
              destroyed — they retreated north toward Wavre, staying within
              supporting distance of Wellington. Two days later, on June 18,
              Napoleon attacked Wellington&apos;s defensive position on the ridge
              of Mont-Saint-Jean, south of the village of Waterloo. The resulting
              battle became one of the most consequential engagements in European
              history, pitting approximately 72,000 French troops against 68,000
              Allied defenders, with 50,000 Prussians arriving during the
              afternoon to seal Napoleon&apos;s fate.
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
              The defeat at Waterloo was total. The French army disintegrated
              during the evening rout, losing roughly 25,000 killed and wounded
              and another 8,000 captured. Prussian cavalry pursued the fleeing
              remnants through the night, ensuring the army could not regroup.
              Napoleon fled to Paris, arriving on June 21.
            </p>
            <p>
              Facing a hostile parliament and the rapid advance of Coalition
              armies, Napoleon abdicated for the second time on June 22, 1815.
              He initially hoped to escape to the United States, but the Royal
              Navy blockade made this impossible. On July 15 he surrendered to
              Captain Maitland aboard HMS Bellerophon, famously throwing himself
              on the mercy of &ldquo;the most powerful, the most constant, and
              the most generous of my enemies.&rdquo;
            </p>
            <p>
              The British government, determined to prevent another return,
              exiled Napoleon to the remote South Atlantic island of Saint Helena,
              over 1,800 kilometres from the nearest land. He spent the remaining
              six years of his life there, dictating his memoirs and shaping the
              legend that would endure long after his death on May 5, 1821.
              Waterloo ended twenty-three years of nearly continuous warfare in
              Europe and ushered in the Concert of Europe — a period of relative
              peace that lasted until the Crimean War in 1853.
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
