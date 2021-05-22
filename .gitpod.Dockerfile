FROM gitpod/workspace-full

# Install custom tools, runtimes, etc.
# For example "bastet", a command-line tetris clone:
# RUN brew install bastet
#
# More information: https://www.gitpod.io/docs/config-docker/

ENV PATH="$PATH:${HOME}/bin"
RUN npm install --global yarn @teambit/bvm && \
    bvm install