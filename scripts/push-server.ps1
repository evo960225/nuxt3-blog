scp -C -r ./.output hoshi@hoshi:/var/www/html/blog/.output
ssh hoshi@hoshi "/var/www/html/repo/hooks/post-receive"