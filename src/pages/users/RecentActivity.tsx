import { DefaultLayout } from "@/layout/DefaultLayout";
import { ActivityMetricsGrid } from "@/components/feature/profile/ActivityMetricsGrid";
import { ActivityFilters } from "@/components/feature/profile/ActivityFilters";
import { ProfileActivityList } from "@/components/feature/profile/ProfileActivityList";
import { ActivityPagination } from "@/components/feature/profile/ActivityPagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const RecentActivity = () => {
  return (
    <DefaultLayout>
      <div className="bg-background min-h-screen font-poppins pb-20 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-3xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-4 duration-500">Actividad Reciente</h1>
            <p className="text-muted-foreground text-sm font-medium">
              Resumen de tu impacto en la plataforma desde tu incorporación.
            </p>
          </div>

          <ActivityMetricsGrid />

          <ActivityFilters />

          <Card className="rounded-2xl border-border shadow-sm bg-card overflow-hidden mt-8 p-8 transition-colors duration-300 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold text-foreground">Historial Completo</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Reusing ProfileActivityList style but without its internal card wrapper logic for better layout control here */}
              <ProfileActivityList />
              <ActivityPagination />
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
