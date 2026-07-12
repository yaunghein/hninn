<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

- Use Figma, Next.js and Tailwind MCPs to inspect and implement pixel perfect designs
- Use other available MCPs when needed as well, e.g. Swiper MCP, GSAP
- Page level component should never be a client component.
- When client interactions are needed, create components under /components folder.
- Don't be afraid to create more nested folder to make components organized.
- Don't nested more than one level under /components folder.
- Always driven data from page level component.
- Always make sure all components are type safe and dry.
- Don't ever overcomplicate things whether it is a component or logic codes.
- Simple and scalable is always better.
- Always use rem unit.
- But sometimes Tailwind will show warning for usage like: The class `px-[1.5rem]` can be written as `px-6`, The class `max-w-[32.125rem]` can be written as `max-w-128.5`, then make sure you use appropriate tailwind to solve those warning. Not juse this two examples, we should not be seeing any tailwind warning.
- Aspect ration should not be use big number. one should always should be 1 and calculate the other side.
- Use zustand to share client side states.
- Treeshake everything under /components and make sure all import from treeshake index.ts file if existed.
- Make sure html markups are semantic and accessible.
