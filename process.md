### Framework:

framework has:

- list of color names
- each color has hue dependant on framework. Tailwind's lime is hue 85, which is not correct according to X11 web standard
- number of shades for each color
- shade weight number, usually 100, 200 etc
- luminosity for each shade

framework needs to calculate:

- hue range for each color: take the central hue and divide the hue circle equally among framework's color list
- shade for each shade weight

Backend workflow:

1.  Take initial color input from user
2.  Take initial color's hue and saturation
3.  Determine other colors hues based on initial color hue.
4.  Determine other colors saturation base on initial color saturation.
5.  Luminosity take from framework's original color palette.
6.  Create shades for each color taking HSL values.
7.  Generate color variables code
