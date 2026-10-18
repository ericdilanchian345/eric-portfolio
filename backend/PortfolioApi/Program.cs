var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("PortfolioFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("PortfolioFrontend");

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        message = "Portfolio API is running!"
    });
});

app.MapGet("/api/projects", () =>
{
    var projects = new[]
    {
        new
        {
            number = "01",
            title = "Rockstar",
            category = new
            {
                en = "Web Design & Development",
                fa = "طراحی و توسعه وب"
            },
            description = new
            {
                en = "A modern web experience built with a strong visual identity, responsive layouts, and attention to detail.",
                fa = "یک تجربه وب مدرن با هویت بصری قدرتمند، طراحی واکنش‌گرا و توجه به جزئیات."
            },
            image = "/images/screenshoot.jpg",
            href = "https://rockstar-app-5wjg.vercel.app/",
            tags = new[] { "Next.js", "React", "Tailwind CSS" }
        },
        new
        {
            number = "02",
            title = "Project Two",
            category = new
            {
                en = "Web Design",
                fa = "طراحی وب"
            },
            description = new
            {
                en = "A clean and modern website concept focused on usability, visual consistency, and responsive design.",
                fa = "طرحی مدرن و مینیمال با تمرکز بر کاربردپذیری، هماهنگی بصری و طراحی واکنش‌گرا."
            },
            image = "/images/screenshoot2.jpg",
            href = "https://portfoliogit-ten.vercel.app/",
            tags = new[] { "UI/UX", "Web Design", "Responsive" }
        },
        new
        {
            number = "03",
            title = "Project Three",
            category = new
            {
                en = "Brand Identity",
                fa = "هویت بصری"
            },
            description = new
            {
                en = "A distinctive visual direction designed to create a consistent and memorable brand experience.",
                fa = "هویتی بصری متمایز برای ساخت تجربه‌ای یکپارچه و ماندگار از برند."
            },
            image = "/images/project-3.jpg",
            href = "",
            tags = new[] { "Branding", "Visual Design", "Identity" }
        },
        new
        {
            number = "04",
            title = "Project Four",
            category = new
            {
                en = "Development",
                fa = "توسعه وب"
            },
            description = new
            {
                en = "A responsive digital product built around performance, accessibility, and a smooth user experience.",
                fa = "محصولی دیجیتال و واکنش‌گرا با تمرکز بر سرعت، دسترس‌پذیری و تجربه کاربری روان."
            },
            image = "/images/project-4.jpg",
            href = "",
            tags = new[] { "React", "Development", "Performance" }
        }
    };

    return Results.Ok(projects);
});

app.Run();