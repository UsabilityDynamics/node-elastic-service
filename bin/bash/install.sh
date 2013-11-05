# Install ElasticSearch Client
#
# @author potanin@UD
# @version 0.1.0

# Link Binaries
ln -f vendor/rabbitmq-3.2.0/sbin/rabbitmq-defaults bin/rabbitmq-defaults
ln -f vendor/rabbitmq-3.2.0/sbin/rabbitmq-env bin/rabbitmq-env
ln -f vendor/rabbitmq-3.2.0/sbin/rabbitmq-server bin/rabbitmq-server
ln -f vendor/rabbitmq-3.2.0/sbin/rabbitmq-plugins bin/rabbitmq-plugins
ln -f vendor/rabbitmq-3.2.0/sbin/rabbitmqctl bin/rabbitmqctl

# Link Configuration
ln -f static/etc/enabled_plugins vendor/rabbitmq-3.2.0/etc/rabbitmq/enabled_plugins
ln -f static/etc/enabled_plugins vendor/rabbitmq-3.2.0-mac/etc/rabbitmq/enabled_plugins

# mkdir /etc/rabbitmq
# ln -f static/etc/rabbitmq.config /etc/rabbitmq/rabbitmq-env.conf
