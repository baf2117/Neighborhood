using Microsoft.Azure.Functions.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(neighborhood.FunctionStartup))]
namespace neighborhood
{
    using System.IO;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;


    public class FunctionStartup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            FunctionsHostBuilderContext context = builder.GetContext();

            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, "local.settings.json"), optional: true, reloadOnChange: false)
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, $"appsettings.{context.EnvironmentName}.json"), optional: true, reloadOnChange: false)
                .AddEnvironmentVariables();
        }

        public override void Configure(IFunctionsHostBuilder builder)
        {
#if DEBUG
            System.Threading.Thread.Sleep(1000);
#endif
            builder.Services.AddLogging();
            builder.Services.AddHttpClient();
            builder.Services.AddHttpContextAccessor();

            var configuration = builder.GetContext().Configuration;

            builder.Services.AddDbContext<NeighborhoodContext>(options =>
            {
                options.UseSqlServer(configuration.GetValue<string>("db"));
                options.EnableDetailedErrors();
                options.EnableSensitiveDataLogging();
            });

            
            builder.Services.AddScoped<IRepository<Profile>, ProfileRepository>();
            builder.Services.AddScoped<IRepository<Visits>, VisitsRepository>();
            builder.Services.AddScoped<IRepository<Notifications>, NotificationsRepository>();
        }
    }
}