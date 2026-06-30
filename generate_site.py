#!/usr/bin/env python3
"""Static site generator for Flash Free Tools.
Run with: python3 generate_site.py
Outputs real, separate, pre-rendered HTML files per route into the project root.
No client-side routing, no build framework - just templated static HTML.
"""
import os

SITE = "https://flashfreetools.com"
SITE_NAME = "Flash Free Tools"
ADSENSE_CLIENT = "ca-pub-2356800923282920"  # existing verified pub ID, kept from current ads.txt

NAV = [
    ("/unit-converter.html", "Unit Converter"),
    ("/qr-generator.html", "QR Generator"),
    ("/calculators.html", "Calculators"),
    ("/password-generator.html", "Password Generator"),
    ("/text-utilities.html", "Text Utilities"),
]

FOOTER_TOOLS = NAV
FOOTER_COMPANY = [
    ("/about.html", "About Us"),
    ("/contact.html", "Contact"),
    ("/privacy-policy.html", "Privacy Policy"),
    ("/terms.html", "Terms of Use"),
    ("/sitemap.html", "Sitemap"),
]


def nav_html(current_path):
    items = []
    for href, label in NAV:
        active = ' aria-current="page"' if href == current_path else ""
        items.append(f'<li><a href="{href}"{active}>{label}</a></li>')
    return "\n          ".join(items)


def footer_html():
    tools_li = "\n          ".join(f'<li><a href="{h}">{l}</a></li>' for h, l in FOOTER_TOOLS)
    company_li = "\n          ".join(f'<li><a href="{h}">{l}</a></li>' for h, l in FOOTER_COMPANY)
    return f"""
  <footer class="site-footer">
    <div class="footer-wrap">
      <div>
        <h4>Tools</h4>
        <ul>
          {tools_li}
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          {company_li}
        </ul>
      </div>
      <div>
        <h4>Flash Free Tools</h4>
        <p style="font-size:0.88rem;color:#94a3b8;">Free, fast, browser-based tools. No sign-up, no installs.</p>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; <span id="year"></span> Flash Free Tools. All rights reserved.
    </div>
  </footer>
"""


def breadcrumb_html(crumbs):
    # crumbs: list of (label, href_or_None)
    parts = []
    for label, href in crumbs:
        if href:
            parts.append(f'<a href="{href}">{label}</a>')
        else:
            parts.append(f'<span aria-current="page">{label}</span>')
    return '<nav class="breadcrumbs" aria-label="Breadcrumb">' + " &rsaquo; ".join(parts) + "</nav>"


def ad_slot(slot_id):
    return f"""
  <div class="ad-slot" id="{slot_id}">
    <!-- AdSense slot: enable <ins> tag once ad units are created in AdSense dashboard -->
    <!--
    <ins class="adsbygoogle" style="display:block" data-ad-client="{ADSENSE_CLIENT}" data-ad-slot="REPLACE_SLOT_ID" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
    -->
  </div>
"""


def page(path, title, description, h1, body_html, extra_head="", extra_scripts="", og_image=None, schema_json=None):
    canonical = SITE + (path if path != "/index.html" else "/")
    og_image = og_image or f"{SITE}/images/og-default.png"
    nav_path = path.replace("/index.html", "/")
    schema_block = f'<script type="application/ld+json">{schema_json}</script>' if schema_json else ""
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonical}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{SITE_NAME}">
<meta property="og:image" content="{og_image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/css/style.css">
<link rel="icon" href="/favicon.ico" sizes="any">
{schema_block}
{extra_head}
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="nav-wrap">
    <a class="logo" href="/" >Flash<span>Free</span>Tools</a>
    <nav class="primary-nav" aria-label="Primary">
      <ul>
        {nav_html(nav_path)}
      </ul>
    </nav>
  </div>
</header>

{ad_slot("ad-top")}

<main id="main" class="container">
{body_html}
</main>

{ad_slot("ad-bottom")}

{footer_html()}

<script src="/js/site.js" defer></script>
{extra_scripts}
</body>
</html>
"""
    out_path = os.path.join(OUT_DIR, path.lstrip("/"))
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        f.write(html)
    print("wrote", out_path)


OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------------------
# HOMEPAGE
# ---------------------------------------------------------------------------
TOOL_CARDS = [
    ("/unit-converter.html", "📐", "Unit Converter", "Convert length, weight, temperature, volume and more instantly."),
    ("/qr-generator.html", "🔲", "QR Code Generator", "Turn any link or text into a downloadable QR code."),
    ("/calculators.html", "🧮", "Calculators", "BMI, percentage, age and everyday calculators."),
    ("/password-generator.html", "🔐", "Password Generator", "Generate strong, random, secure passwords."),
    ("/text-utilities.html", "📝", "Text Utilities", "Word counter, case converter, and text cleanup tools."),
]

tool_cards_html = "\n".join(
    f"""<a class="tool-card" href="{href}">
  <div class="icon">{icon}</div>
  <h3>{name}</h3>
  <p>{desc}</p>
</a>"""
    for href, icon, name, desc in TOOL_CARDS
)

home_body = f"""
<section class="hero">
  <h1>Free Online Tools That Just Work</h1>
  <p>Fast, browser-based utilities for everyday tasks. No sign-up, no installs, no nonsense &mdash; everything runs locally in your browser.</p>
</section>

<section class="tool-grid">
{tool_cards_html}
</section>

<section class="content-block">
  <h2>Why Flash Free Tools</h2>
  <p>Flash Free Tools is a free collection of single-purpose web utilities built for speed. Each tool lives on its own page, loads quickly, and does one job well &mdash; whether that's converting units, generating a QR code, or cleaning up a block of text. There's no account to create and no data leaves your browser for any of the calculations.</p>
  <p>New tools are added regularly based on what people actually search for. If there's a utility you'd like to see, <a href="/contact.html">let us know</a>.</p>
</section>
"""

page(
    "/index.html",
    "Free Online Tools | Unit Converter, QR Generator, Calculators & More",
    "Flash Free Tools offers free, fast, browser-based utilities: unit converter, QR code generator, calculators, password generator, and text tools. No sign-up required.",
    "Free Online Tools That Just Work",
    home_body,
)

# ---------------------------------------------------------------------------
# UNIT CONVERTER
# ---------------------------------------------------------------------------
unit_body = f"""
{breadcrumb_html([("Home", "/"), ("Unit Converter", None)])}
<h1>Unit Converter</h1>
<p>Convert between common units of length, weight, and temperature instantly. All conversions run locally in your browser &mdash; nothing is sent to a server.</p>

<div class="tool-panel">
  <div class="field-row">
    <div class="field">
      <label for="uc-category">Category</label>
      <select id="uc-category">
        <option value="length">Length</option>
        <option value="weight">Weight</option>
        <option value="temperature">Temperature</option>
      </select>
    </div>
  </div>
  <div class="field-row">
    <div class="field">
      <label for="uc-input">Value</label>
      <input type="number" id="uc-input" value="1">
    </div>
    <div class="field">
      <label for="uc-from">From</label>
      <select id="uc-from"></select>
    </div>
    <div class="field">
      <label for="uc-to">To</label>
      <select id="uc-to"></select>
    </div>
  </div>
  <button class="btn" id="uc-convert">Convert</button>
  <div class="result-box" id="uc-result" aria-live="polite"></div>
</div>

<article class="content-block">
  <h2>How to use the unit converter</h2>
  <p>Pick a category (length, weight, or temperature), choose the unit you're converting from and to, enter a value, and click Convert. The result updates instantly with no page reload.</p>
  <h2>Supported units</h2>
  <p><strong>Length:</strong> millimeters, centimeters, meters, kilometers, inches, feet, yards, miles.<br>
  <strong>Weight:</strong> milligrams, grams, kilograms, ounces, pounds, stone.<br>
  <strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin.</p>
  <dl class="faq">
    <h2>Frequently asked questions</h2>
    <dt>Is this unit converter accurate?</dt>
    <dd>Yes. Conversions use standard, internationally recognized conversion factors (e.g. 1 inch = 2.54 cm exactly).</dd>
    <dt>Does it work offline?</dt>
    <dd>Once the page is loaded, conversions run entirely in your browser with JavaScript, so no internet connection is needed for the calculation itself.</dd>
    <dt>Is my data stored or sent anywhere?</dt>
    <dd>No. Nothing you type into this tool is transmitted to any server or stored.</dd>
  </dl>
</article>
"""
page(
    "/unit-converter.html",
    "Unit Converter - Length, Weight & Temperature | Flash Free Tools",
    "Free online unit converter for length, weight, and temperature. Instant, accurate conversions that run entirely in your browser.",
    "Unit Converter",
    unit_body,
    extra_scripts='<script src="/js/unit-converter.js" defer></script>',
)

# ---------------------------------------------------------------------------
# QR GENERATOR
# ---------------------------------------------------------------------------
qr_body = f"""
{breadcrumb_html([("Home", "/"), ("QR Code Generator", None)])}
<h1>QR Code Generator</h1>
<p>Create a QR code from any link or block of text, then download it as an image. Generated entirely in your browser.</p>

<div class="tool-panel">
  <div class="field-row">
    <div class="field">
      <label for="qr-text">Text or URL</label>
      <input type="text" id="qr-text" placeholder="https://example.com">
    </div>
  </div>
  <button class="btn" id="qr-generate">Generate QR Code</button>
  <button class="btn btn-secondary" id="qr-download" style="display:none;">Download PNG</button>
  <div id="qr-output" style="margin-top:1rem;"></div>
</div>

<article class="content-block">
  <h2>How to use the QR code generator</h2>
  <p>Paste a URL or type any text into the box above and click Generate. A scannable QR code appears immediately, and you can download it as a PNG to print or share.</p>
  <h2>Common uses for QR codes</h2>
  <p>Linking to a website from print materials, sharing Wi-Fi credentials, business cards, restaurant menus, event check-ins, and product packaging.</p>
  <dl class="faq">
    <h2>Frequently asked questions</h2>
    <dt>Do QR codes expire?</dt>
    <dd>No. A QR code generated here encodes your text directly and works for as long as the underlying link or content remains valid.</dd>
    <dt>Is there a limit to how much text I can encode?</dt>
    <dd>QR codes can hold a few thousand characters, but shorter content (especially URLs) scans more reliably across all phone cameras.</dd>
  </dl>
</article>
"""
page(
    "/qr-generator.html",
    "Free QR Code Generator - Create & Download QR Codes | Flash Free Tools",
    "Generate a QR code from any link or text for free. Download as PNG instantly. No sign-up, runs entirely in your browser.",
    "QR Code Generator",
    qr_body,
    extra_head='<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" defer></script>',
    extra_scripts='<script src="/js/qr-generator.js" defer></script>',
)

# ---------------------------------------------------------------------------
# CALCULATORS
# ---------------------------------------------------------------------------
calc_body = f"""
{breadcrumb_html([("Home", "/"), ("Calculators", None)])}
<h1>Calculators</h1>
<p>Quick everyday calculators: BMI, percentage, and age. Pick a calculator below.</p>

<div class="tool-panel">
  <h2 style="margin-top:0;">BMI Calculator</h2>
  <div class="field-row">
    <div class="field"><label for="bmi-weight">Weight (kg)</label><input type="number" id="bmi-weight" value="70"></div>
    <div class="field"><label for="bmi-height">Height (cm)</label><input type="number" id="bmi-height" value="175"></div>
  </div>
  <button class="btn" id="bmi-calc">Calculate BMI</button>
  <div class="result-box" id="bmi-result" aria-live="polite"></div>
</div>

<div class="tool-panel">
  <h2 style="margin-top:0;">Percentage Calculator</h2>
  <div class="field-row">
    <div class="field"><label for="pct-value">Value</label><input type="number" id="pct-value" value="50"></div>
    <div class="field"><label for="pct-total">Out of</label><input type="number" id="pct-total" value="200"></div>
  </div>
  <button class="btn" id="pct-calc">Calculate Percentage</button>
  <div class="result-box" id="pct-result" aria-live="polite"></div>
</div>

<div class="tool-panel">
  <h2 style="margin-top:0;">Age Calculator</h2>
  <div class="field-row">
    <div class="field"><label for="age-dob">Date of birth</label><input type="text" id="age-dob" placeholder="YYYY-MM-DD"></div>
  </div>
  <button class="btn" id="age-calc">Calculate Age</button>
  <div class="result-box" id="age-result" aria-live="polite"></div>
</div>

<article class="content-block">
  <h2>About these calculators</h2>
  <p>The BMI calculator uses the standard formula (weight in kg divided by height in meters squared) and is intended as a general guideline, not medical advice. The percentage calculator finds what percentage one number is of another. The age calculator computes exact age in years, months, and days from a date of birth.</p>
  <dl class="faq">
    <h2>Frequently asked questions</h2>
    <dt>Is BMI a perfect measure of health?</dt>
    <dd>No. BMI doesn't account for muscle mass, bone density, or body composition. Use it as a rough guideline and consult a healthcare provider for personalized advice.</dd>
  </dl>
</article>
"""
page(
    "/calculators.html",
    "Free Online Calculators - BMI, Percentage & Age | Flash Free Tools",
    "Free BMI calculator, percentage calculator, and age calculator. Fast, accurate, no sign-up required.",
    "Calculators",
    calc_body,
    extra_scripts='<script src="/js/calculators.js" defer></script>',
)

# ---------------------------------------------------------------------------
# PASSWORD GENERATOR
# ---------------------------------------------------------------------------
pw_body = f"""
{breadcrumb_html([("Home", "/"), ("Password Generator", None)])}
<h1>Password Generator</h1>
<p>Generate a strong, random password. Everything happens locally in your browser &mdash; generated passwords are never transmitted or stored.</p>

<div class="tool-panel">
  <div class="field-row">
    <div class="field">
      <label for="pw-length">Length: <span id="pw-length-val">16</span></label>
      <input type="range" id="pw-length" min="6" max="64" value="16">
    </div>
  </div>
  <div class="field-row">
    <label><input type="checkbox" id="pw-upper" checked> Uppercase letters</label>
    <label><input type="checkbox" id="pw-lower" checked> Lowercase letters</label>
    <label><input type="checkbox" id="pw-numbers" checked> Numbers</label>
    <label><input type="checkbox" id="pw-symbols" checked> Symbols</label>
  </div>
  <button class="btn" id="pw-generate">Generate Password</button>
  <button class="btn btn-secondary" id="pw-copy">Copy</button>
  <div class="result-box" id="pw-result" aria-live="polite"></div>
</div>

<article class="content-block">
  <h2>How this password generator works</h2>
  <p>The generator uses your browser's cryptographically secure random number generator (<code>crypto.getRandomValues</code>) to produce passwords, not a simple pseudo-random function. Choose a length and which character types to include, then generate.</p>
  <h2>Tips for strong passwords</h2>
  <p>Use at least 12-16 characters, mix character types, and use a unique password for every account &mdash; ideally stored in a password manager rather than memorized or reused.</p>
  <dl class="faq">
    <h2>Frequently asked questions</h2>
    <dt>Are generated passwords stored anywhere?</dt>
    <dd>No. Passwords are generated and displayed entirely in your browser and are never sent to any server.</dd>
  </dl>
</article>
"""
page(
    "/password-generator.html",
    "Strong Password Generator - Free & Secure | Flash Free Tools",
    "Generate strong, random, secure passwords for free. Customize length and character types. Runs entirely in your browser.",
    "Password Generator",
    pw_body,
    extra_scripts='<script src="/js/password-generator.js" defer></script>',
)

# ---------------------------------------------------------------------------
# TEXT UTILITIES
# ---------------------------------------------------------------------------
text_body = f"""
{breadcrumb_html([("Home", "/"), ("Text Utilities", None)])}
<h1>Text Utilities</h1>
<p>Word counter, case converter, and text cleanup &mdash; all in one place.</p>

<div class="tool-panel">
  <label for="tu-input">Your text</label>
  <textarea id="tu-input" placeholder="Paste or type text here..."></textarea>
  <div class="field-row" style="margin-top:0.8rem;">
    <button class="btn btn-secondary" id="tu-upper">UPPERCASE</button>
    <button class="btn btn-secondary" id="tu-lower">lowercase</button>
    <button class="btn btn-secondary" id="tu-title">Title Case</button>
    <button class="btn btn-secondary" id="tu-trim">Trim Extra Spaces</button>
  </div>
  <div class="result-box" id="tu-stats" aria-live="polite"></div>
</div>

<article class="content-block">
  <h2>What this tool does</h2>
  <p>Paste any text to instantly see word count, character count, and sentence count, or transform the text's case. Useful for writers, students, and developers cleaning up copy before publishing.</p>
  <dl class="faq">
    <h2>Frequently asked questions</h2>
    <dt>Is there a text length limit?</dt>
    <dd>No hard limit &mdash; the tool processes text directly in your browser, so very large documents are handled fine on modern devices.</dd>
  </dl>
</article>
"""
page(
    "/text-utilities.html",
    "Text Utilities - Word Counter & Case Converter | Flash Free Tools",
    "Free text tools: word counter, character counter, case converter, and whitespace cleanup. No sign-up required.",
    "Text Utilities",
    text_body,
    extra_scripts='<script src="/js/text-utilities.js" defer></script>',
)

# ---------------------------------------------------------------------------
# ABOUT / CONTACT / PRIVACY / TERMS / SITEMAP
# ---------------------------------------------------------------------------
about_body = f"""
{breadcrumb_html([("Home", "/"), ("About", None)])}
<article class="content-block">
<h1>About Flash Free Tools</h1>
<p>Flash Free Tools is an independent website offering free, browser-based utilities &mdash; including a unit converter, QR code generator, calculators, password generator, and text tools. The site is built and maintained by a single developer with a simple goal: fast tools that work without forcing you to create an account or install anything.</p>
<h2>Why we built this</h2>
<p>Most "free tool" sites are bloated with intrusive pop-ups, fake download buttons, or require sign-up for basic functionality. Flash Free Tools is built to load fast, run every calculation locally in your browser, and stay out of your way.</p>
<h2>How the site is funded</h2>
<p>Flash Free Tools is supported by display advertising and, where relevant, affiliate links. Advertising helps keep every tool free to use with no paywalls or subscriptions. See our <a href="/privacy-policy.html">Privacy Policy</a> for details on data and cookies.</p>
<h2>Contact</h2>
<p>Questions, bug reports, or tool requests are welcome &mdash; see our <a href="/contact.html">Contact page</a>.</p>
</article>
"""
page("/about.html", "About Us | Flash Free Tools", "Learn about Flash Free Tools, who runs it, and why it exists.", "About Flash Free Tools", about_body)

contact_body = f"""
{breadcrumb_html([("Home", "/"), ("Contact", None)])}
<article class="content-block">
<h1>Contact Us</h1>
<p>Have a question, found a bug, or want to suggest a new tool? Reach out:</p>
<p><strong>Email:</strong> <a href="mailto:contact@flashfreetools.com">contact@flashfreetools.com</a></p>
<p>We read every message and aim to respond within a few business days. For advertising or partnership inquiries, please include "Advertising" in your subject line.</p>
</article>
"""
page("/contact.html", "Contact Us | Flash Free Tools", "Get in touch with the Flash Free Tools team with questions, bug reports, or tool suggestions.", "Contact Us", contact_body)

privacy_body = f"""
{breadcrumb_html([("Home", "/"), ("Privacy Policy", None)])}
<article class="content-block">
<h1>Privacy Policy</h1>
<p><em>Last updated: June 2026</em></p>
<p>This Privacy Policy explains how Flash Free Tools ("we," "us," "the site") handles information when you visit flashfreetools.com.</p>

<h2>Information we collect</h2>
<p>The tools on this site (unit converter, QR generator, calculators, password generator, text utilities) run entirely in your browser. Text you type into these tools is not transmitted to or stored on our servers.</p>
<p>Like most websites, we automatically receive standard technical information when you visit, such as your IP address, browser type, device type, and pages visited, typically collected via server logs and analytics tools.</p>

<h2>Cookies and tracking</h2>
<p>We use cookies and similar technologies for:</p>
<ul>
<li>Basic site functionality</li>
<li>Analytics, to understand how visitors use the site (e.g. Google Analytics)</li>
<li>Advertising, including Google AdSense, which may use cookies to serve ads based on your prior visits to this and other websites</li>
</ul>
<p>You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener">www.aboutads.info/choices</a>.</p>

<h2>Third-party advertising</h2>
<p>This site uses Google AdSense to display ads. Google, as a third-party vendor, uses cookies to serve ads on this site. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google's Ads Settings.</p>

<h2>Data sharing</h2>
<p>We do not sell your personal information. We may share aggregated, non-identifying information with analytics and advertising partners as described above.</p>

<h2>Children's privacy</h2>
<p>This site is not directed at children under 13, and we do not knowingly collect personal information from children.</p>

<h2>Your rights</h2>
<p>Depending on your location, you may have rights to access, correct, or delete personal information we hold about you. Contact us at <a href="mailto:contact@flashfreetools.com">contact@flashfreetools.com</a> with any such requests.</p>

<h2>Changes to this policy</h2>
<p>We may update this policy from time to time. Changes will be posted on this page with an updated revision date.</p>

<h2>Contact</h2>
<p>Questions about this policy can be sent to <a href="mailto:contact@flashfreetools.com">contact@flashfreetools.com</a>.</p>
</article>
"""
page("/privacy-policy.html", "Privacy Policy | Flash Free Tools", "Read the Flash Free Tools privacy policy covering data collection, cookies, and third-party advertising.", "Privacy Policy", privacy_body)

terms_body = f"""
{breadcrumb_html([("Home", "/"), ("Terms of Use", None)])}
<article class="content-block">
<h1>Terms of Use</h1>
<p><em>Last updated: June 2026</em></p>
<p>By using Flash Free Tools (flashfreetools.com), you agree to these terms.</p>

<h2>Use of the site</h2>
<p>Flash Free Tools provides free, browser-based utilities for personal and professional use. You may use these tools for any lawful purpose. You may not use automated systems to scrape, copy, or redistribute the site's tools or content without permission.</p>

<h2>No warranty</h2>
<p>Tools on this site (including calculators, converters, and generators) are provided "as is" for convenience. While we aim for accuracy, we make no guarantee that results are error-free, and the BMI calculator and similar tools are not a substitute for professional medical, legal, or financial advice.</p>

<h2>Limitation of liability</h2>
<p>Flash Free Tools is not liable for any damages arising from use of, or inability to use, this site or its tools.</p>

<h2>Advertising</h2>
<p>This site displays advertising, including via Google AdSense, to support free access to its tools. See our <a href="/privacy-policy.html">Privacy Policy</a> for details.</p>

<h2>Changes</h2>
<p>We may update these terms at any time; continued use of the site constitutes acceptance of the current terms.</p>

<h2>Contact</h2>
<p>Questions about these terms can be sent to <a href="mailto:contact@flashfreetools.com">contact@flashfreetools.com</a>.</p>
</article>
"""
page("/terms.html", "Terms of Use | Flash Free Tools", "Terms of use for Flash Free Tools, covering acceptable use, warranty disclaimers, and advertising.", "Terms of Use", terms_body)

all_links = [("/", "Home")] + NAV + FOOTER_COMPANY
sitemap_li = "\n".join(f'<li><a href="{h}">{l}</a></li>' for h, l in all_links)
sitemap_body = f"""
{breadcrumb_html([("Home", "/"), ("Sitemap", None)])}
<article class="content-block">
<h1>Sitemap</h1>
<p>All pages on Flash Free Tools:</p>
<ul>
{sitemap_li}
</ul>
</article>
"""
page("/sitemap.html", "Sitemap | Flash Free Tools", "Browse all pages and tools available on Flash Free Tools.", "Sitemap", sitemap_body)

# ---------------------------------------------------------------------------
# 404
# ---------------------------------------------------------------------------
notfound_body = """
<article class="content-block" style="text-align:center;">
<h1>404 - Page Not Found</h1>
<p>The page you're looking for doesn't exist or has moved.</p>
<p><a href="/" class="btn">Back to Home</a></p>
</article>
"""
page("/404.html", "Page Not Found | Flash Free Tools", "The page you requested could not be found.", "Page Not Found", notfound_body)

print("\nDone. All pages generated.")

# ---------------------------------------------------------------------------
# sitemap.xml
# ---------------------------------------------------------------------------
SITEMAP_PATHS = [
    ("/", "1.0", "weekly"),
    ("/unit-converter.html", "0.9", "monthly"),
    ("/qr-generator.html", "0.9", "monthly"),
    ("/calculators.html", "0.9", "monthly"),
    ("/password-generator.html", "0.9", "monthly"),
    ("/text-utilities.html", "0.9", "monthly"),
    ("/about.html", "0.5", "yearly"),
    ("/contact.html", "0.4", "yearly"),
    ("/privacy-policy.html", "0.3", "yearly"),
    ("/terms.html", "0.3", "yearly"),
    ("/sitemap.html", "0.3", "yearly"),
]

import datetime
today = datetime.date.today().isoformat()
entries = "\n".join(
    f"""  <url>
    <loc>{SITE}{path}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>"""
    for path, prio, freq in SITEMAP_PATHS
)
sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{entries}
</urlset>
"""
with open(os.path.join(OUT_DIR, "sitemap.xml"), "w") as f:
    f.write(sitemap_xml)
print("wrote sitemap.xml")
