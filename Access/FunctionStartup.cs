using Microsoft.Azure.Functions.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(neighbor.FunctionStartup))]
namespace neighbor
{
    using System;
    using System.IO;
    using System.Reflection;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Localization;
    using Microsoft.Extensions.ObjectPool;
    using Microsoft.Extensions.Options;
    using neighborhood;

    public class FunctionStartup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            FunctionsHostBuilderContext context = builder.GetContext();

            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, "appsettings.json"), optional: true, reloadOnChange: false)
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

            var configuration = builder.GetContext().Configuration;

            builder.Services.AddDbContext<NeighborhoodContext>(options =>
            {
                options.UseSqlServer(configuration.GetValue<string>("db"));
                options.EnableDetailedErrors();
                options.EnableSensitiveDataLogging();
            });



            string executionPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var compiledViewAssembly = Assembly.LoadFile(Path.Combine(executionPath, "access.Views.dll"));
            builder.Services
                .AddSingleton<IStringLocalizerFactory, ResourceManagerStringLocalizerFactory>()
                .AddScoped<RazorViewToStringRenderer>()
                .AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>()
                .AddMvcCore()
                .AddViews()
                .AddRazorViewEngine()
                .AddApplicationPart(compiledViewAssembly);

            builder.Services.AddScoped<IRepository<Profile>, ProfileRepository>();
            builder.Services.AddScoped<IRepository<Visits>, VisitsRepository>();
            builder.Services.AddScoped<IRepository<Notifications>, NotificationsRepository>();
        }
    }
}